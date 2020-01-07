const mailjet = require('node-mailjet');
// @ts-ignore
const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = require('../constants');

const emailClient = mailjet.connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);

const sendMail = async (_from, _to, title, body)=> {
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
    console.log(err.statusCode)
    return false;
  });
  
  // @ts-ignore
  console.log(result.body);
  return true;
};

module.exports = sendMail;
