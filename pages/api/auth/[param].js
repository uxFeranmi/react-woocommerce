import { sendMagicLink } from './send_magic_link';
import { handleMagicLink } from './handle_magic_link';

let pendingClients = {};

const pendingClientMethods = {
  get: (authKey)=> pendingClients[authKey],

  delete: (authKey)=> {
    clearTimeout(pendingClients[authKey].timer);
    delete pendingClients[authKey];
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

export default async (req, res)=> {
  let {param: urlParam} = req.query;

  if (urlParam == 'sign-in') {
    await sendMagicLink(req, res, pendingClientMethods);
    return;
  }

  if (urlParam.startsWith('magic-')) {
    let authKey = urlParam.replace('magic-', '');
    await handleMagicLink(req, res, pendingClientMethods, authKey);
    return;
  }

  else res.status(404).send('Nothing to see here.');
};
