export const sendMagicLink = async (req, res, pendingClients)=> {
  const {email} = req.body;
  const authKey = uuid();
  const magicUrl = `http://itsupplies.co/api/auth/magic-${authKey}`;

  emailContent = ejs.render('magic_link_email.ejs', {magicUrl});

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
