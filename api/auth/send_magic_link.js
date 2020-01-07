const path = require('path');
const uuid = require('uuid/v4');
const renderEjs = require('../services/render_ejs');
// @ts-ignore
const { EMAIL_SENDER_NO_REPLY: senderEmail, DOMAIN_NAME } = require('../constants');
const { sendMail } = require('../services/send_email');
const cd = 'pages/api/auth';

const sendMagicLink = async (req, res, Clients)=> {
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

module.exports = sendMagicLink;
