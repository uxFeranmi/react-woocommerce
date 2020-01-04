let pendingClients = {};

const sendMagicLink = async (req, res, pendingClients)=> {
  const {email} = req.body;
  const authKey = uuid();
  const magicUrl = `http://itsupplies.co/api/auth/magic-${authKey}`;

  emailContent = ejs.render('magic_link_email.ejs');

  res.header = {
    contentType: 'text/text-stream',
    keepAlive: true,
  };

  pendingClients[authKey] = {
    email,
    res,
  };

  await sendMail(emailContent);

  setTimeout(()=> delete pendingClients[authKey], 600000); //600,000ms i.e 10 minutes.
};

const handleMagicLink = (req, res, pendingClients, authKey)=> {
  
};

export default (req, res)=> {
  let {param: urlParam} = req.query;

  if (urlParam == 'sign-in') {
    sendMagicLink(req, res, pendingClients);
    return;
  }

  if (urlParam.startsWith('magic-')) {
    let authKey = urlParam.replace('magic-', '');
    handleMagicLink(req, res, pendingClients, authKey);
    return;
  }
};
