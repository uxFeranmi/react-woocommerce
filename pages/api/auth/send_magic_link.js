import uuid from 'uuid/v4';
import renderEjs from '../../../services/render_ejs';
import { EMAIL_SENDER_NO_REPLY as senderEmail } from '../config/constants';
import sendMail from '../../../services/send_email';

export const sendMagicLink = async (req, res, Clients)=> {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
  });

  const {email: userEmail} = req.query;
  const authKey = uuid();
  const magicUrl = `http://itsupplies.co/api/auth/magic-${authKey}`;

  const templatePath = path.join(__dirname, 'templates/magic_link.ejs');
  const emailContent = renderEjs(templatePath, {magicUrl});
  const emailTitle = 'Complete Your Sign In'

  await sendMail(senderEmail, userEmail, emailTitle, emailContent);
  
  res.write(
    `event: mailsent\n
    data: Magic link sent to email.\n\n
    id: mailsent:${userEmail}\n`
  );
  Clients.add({authKey, email: userEmail, res});
};

//Direct API calls to this file are not allowed.
export default (req, res)=> res.status(404).json({message: 'Nothing to see here.'});
