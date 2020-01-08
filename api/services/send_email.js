const mailjet = require('node-mailjet');
// @ts-ignore
const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = require('../constants');

const emailClient = mailjet.connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);

const sendMail = async (_from, _to, title, body)=> {
  let success = true;

  const result = await emailClient.post('send', { version: 'v3.1' }).request({
    Messages: [{
      From: {
        Email: _from,
        Name: 'IT Supplies Shop',
      },
      To: [
        {
          Email: _to,
          Name: 'You',
        },
      ],
      Subject: title,
      TextPart: '',
      HTMLPart: body,
    }],
  }).catch(err => {
    console.log('Error sending email:', err.message);
    success = false;
  });
  
  // @ts-ignore
  console.log('Result body: ', result.body);
  return success;
};

module.exports = sendMail;
