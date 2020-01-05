import { SENDER_EMAIL, EMAIL_PASSWORD, SENDER_ADDR } from '../config/constants';

import mailjet from 'node-mailjet';

mailjet.connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendMail = async (recipientEmail, title, messageBody)=> {
  const result = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [{
      From: {
        Email: SENDER_EMAIL,
        Name: 'IT Supplies',
      },
      To: [
        {
          Email: recipientEmail,
          Name: 'You',
        },
      ],
      Subject: title,
      TextPart: '',
      HTMLPart: messageBody,
    }],
  }).catch(err => {
    console.log(err.statusCode)
    return false;
  });
  
  console.log(result.body);
  return true;
};

  