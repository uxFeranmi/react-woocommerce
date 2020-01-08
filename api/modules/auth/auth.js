// @ts-nocheck
const nanoid = require('nanoid');
const sendMagicLink = require('./send_magic_link');
const verifyMagicLink = require('./verify_magic_link');

let pendingClients = {};

const pendingClientMethods = {
  get: (authKey)=> pendingClients[authKey],

  delete: (authKey)=> {
    clearTimeout(pendingClients[authKey].timer);
    delete pendingClients[authKey]
  },

  add: ({authKey, email, res})=> {
    //900,000ms i.e 15 minutes.
    res.setTimeout(900000, () => {
      pendingClients[authKey]
        .sendEvent('timeout', 'This authentication request has timed out.');
        
      delete pendingClients[authKey];
      delete res;
    });

    pendingClients[authKey] = {
      email,
      res,
      timestamp: Date.now(),
      sendEvent: (event, data = null)=> {
        if (!data) {
          data = event;
          event = 'message';
        }

        const {res} = pendingClients[authKey];
        const id = nanoid();

        res.write(`event: ${event}\n`);
        res.write(`id: ${id}\n`);
        res.write(`data: ${data}\n\n`);

        pendingClients[authKey].lastEventId = id;
      },
    };

    return pendingClients[authKey];
  },
};

const handleExistingClient = (res, email, lastEventId)=> {
  for (let client in pendingClients) {
    if (client.email === email && client.lastEventId === lastEventId) {
      const timespent = Date.now() - client.timestamp;
      const timeleft = 900000 - timespent;
      res.setTimeout(timeleft, () => {
        client.sendEvent('timeout', 'This authentication request has timed out.');
        delete res;
        delete client;
      });

      client.res = res;
      client.sendEvent('reconnected', 'EventStream connection re-established.');
      return;
    }
  }

  res.setHeader('Connection', "close");
  res.status(408)
    .send('No existing stream was found matching the given Last-Event-ID. It has probably timed-out.');
};

const auth = {
  initiate: (req, res)=> {
    const lastEventId = req.header('Last-Event-ID');
    const {email} = req.query;

    if (lastEventId)
      handleExistingClient(res, email, lastEventId)

    else
      sendMagicLink(req, res, pendingClientMethods);
  },

  finalize: (req, res)=> verifyMagicLink(req, res, pendingClientMethods),
}

module.exports = auth;
