const path = require('path');
const uuid = require('uuid/v4');
const renderEjs = require('../../services/render_ejs');
// @ts-ignore
const { EMAIL_SENDER_NO_REPLY: senderEmail, DOMAIN_NAME } = require('../../constants');
const sendMail = require('../../services/send_email');

const sendMagicLink = async (req, res, Clients)=> {
  const {email: userEmail} = req.query;
  const authKey = uuid();

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
  });

  const client = Clients.add({authKey, email: userEmail, res});
  client.sendEvent('received', 'Processing...\n\n');

  const magicUrl = `${DOMAIN_NAME}/api/auth/magic-${authKey}`;

  const templatePath = path.join(__dirname, 'templates/magic_link_email.ejs');
  const emailContent = renderEjs(templatePath, {magicUrl});
  const emailTitle = 'Complete Your Sign In'

  const mailSent = await sendMail(senderEmail, userEmail, emailTitle, emailContent);
  
  if (!mailSent) {
    client.sendEvent('error', 'Failed to send email.\n\n');
    Clients.delete(authKey);
    return;
  }
  
  client.sendEvent('mailsent', 'Magic link sent to email.\n\n');
};

module.exports = sendMagicLink;
