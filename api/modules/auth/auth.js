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

  add: ({authKey, email, res})=> pendingClients[authKey] = {
    email,
    res,
    
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

      pendingClients[authKey].lastReqId = id;
    },

    timer: setTimeout(()=> {
      const {res} = pendingClients[authKey];

      res.write('event: timeout\n');
      res.write(`id: timeout:${authKey}\n`);
      res.write('data: This authentication request has timed out.\n\n');

      delete pendingClients[authKey]
    }, 900000), // 900,000ms i.e 15 minutes.
  },
};

const handleExistingClient = (res, email, lastReqId)=> {
  for (let client in pendingClients) {
    if (client.email === email && client.lastReqId === lastReqId) {
      client.res = res;
      client.sendEvent('reconnected', 'EventStream connection re-established.');
      return true;
    }
  }

  return false;
}

const auth = {
  initiate: (req, res)=> {
    const lastReqId = req.header('Last-Event-ID');
    const {email} = req.query;

    const clientExists = handleExistingClient(res, email, lastReqId);

    if (!clientExists)
      sendMagicLink(req, res, pendingClientMethods);
  },

  finalize: (req, res)=> verifyMagicLink(req, res, pendingClientMethods),
}

module.exports = auth;