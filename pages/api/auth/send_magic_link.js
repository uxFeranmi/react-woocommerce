export const sendMagicLink = async (req, res, Clients)=> {
  const {email} = req.body;
  const authKey = uuid();
  const magicUrl = `http://itsupplies.co/api/auth/magic-${authKey}`;

  const emailContent = ejs.render('magic_link_email.ejs', {magicUrl});

  res.header = {
    contentType: 'text/text-stream',
    keepAlive: true,
  };

  Clients.add({authKey, email, res});

  await sendMail(emailContent);
  
  res.write({event: 'mailsent'});
};

const noRouteMessage = JSON.stringify({message: 'Nothing to see here.'});
export default (req, res)=> res.status(404).send(noRouteMessage);
