const { sendMagicLink } = require('./send_magic_link');
const { verifyMagicLink } = require('./verify_magic_link');

let pendingClients = {};

const pendingClientMethods = {
  get: (authKey)=> pendingClients[authKey],

  delete: (authKey)=> {
    console.log('delete method called')
    clearTimeout(pendingClients[authKey].timer);
    delete pendingClients[authKey];
    console.log('delete method finished');
  },

  add: ({authKey, email, res})=> pendingClients[authKey] = {
    email,
    res,
    timer: setTimeout(()=> {
      pendingClients[authKey].res.write(
        `event: timeout\n
        data: This authentication request has timed out.\n\n
        id: timeout:${authKey}\n`
      );
      delete pendingClients[authKey]
    }, 600000), //600,000ms i.e 10 minutes.
  },
};

const auth = {
  initiateFlow: (req, res)=> sendMagicLink(req, res, pendingClientMethods),
  finalize: (req, res)=> verifyMagicLink(req, res, pendingClientMethods),
}

module.exports = auth;