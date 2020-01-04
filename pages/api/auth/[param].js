let pendingClients = {};

const pendingClientMethods = {
  get: (authKey)=> pendingClients[authKey],
  delete: (authKey)=> delete pendingClients[authKey],
};

export default (req, res)=> {
  let {param: urlParam} = req.query;

  if (urlParam == 'sign-in') {
    sendMagicLink(req, res, pendingClientMethods);
    return;
  }

  if (urlParam.startsWith('magic-')) {
    let authKey = urlParam.replace('magic-', '');
    handleMagicLink(req, res, pendingClientMethods, authKey);
    return;
  }
};
