import uuid from 'uuid/v4';
import renderEjs from '../../../services/render_ejs';

export const sendMagicLink = async (req, res, Clients)=> {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  });

  const {email} = req.query;
  const authKey = uuid();
  const magicUrl = `http://itsupplies.co/api/auth/magic-${authKey}`;

  const templatePath = path.join(__dirname, 'templates/magic_link.ejs');
  const emailContent = renderEjs(templatePath, {magicUrl});

  await sendMail(emailContent, email);
  
  res.write({event: 'mailsent'});
  Clients.add({authKey, email, res});
};

//Direct API calls to this file are not allowed.
export default (req, res)=> res.status(404).json({message: 'Nothing to see here.'});
