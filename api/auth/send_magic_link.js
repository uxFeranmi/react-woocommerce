import path from 'path';
import uuid from 'uuid/v4';
import renderEjs from '../services/render_ejs';
// @ts-ignore
import { EMAIL_SENDER_NO_REPLY as senderEmail, DOMAIN_NAME } from '../constants';
import { sendMail } from '../services/send_email';
const cd = 'pages/api/auth';

export const sendMagicLink = async (req, res, Clients)=> {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
  });
  res.write('data: Processing...\n\n');

  const {email: userEmail} = req.query;
  const authKey = uuid();
  const magicUrl = `${DOMAIN_NAME}/api/auth/magic-${authKey}`;

  const templatePath = path.join(process.cwd(), cd, 'templates/magic_link_email.ejs');
  const emailContent = renderEjs(templatePath, {magicUrl});
  const emailTitle = 'Complete Your Sign In'

  //await sendMail(senderEmail, userEmail, emailTitle, emailContent);
  
  res.write('event: mailsent\n');
  res.write(`id: mailsent:${userEmail}\n`);
  res.write('data: Magic link sent to email.\n\n');

  Clients.add({authKey, email: userEmail, res});
};

//Direct API calls to this file are not allowed.
export default (req, res)=> {
  /*res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
  });*/
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Cache-Control', 'no-cache')

  //console.log('' + res.write);//res.status(404).json({message: 'Nothing to see here.'});
  console.log(res.write('First message', 'utf8', ()=> console.log('' + res.flush)));
  res.flush();
  
  setTimeout(()=> {
    console.log(res.write('Second message', 'utf8'));
    console.log(res.write('Third message', 'utf8', ()=> console.log('res.write callback')));
    setTimeout(()=> res.end(), 5000);
  }, 1000);
}
