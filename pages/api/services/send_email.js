import mailjet from 'node-mailjet';
// @ts-ignore
import { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } from '../constants';

 mailjet.connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);

export const sendMail = async (from, to, title, body)=> {
  const result = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [{
      From: {
        Email: from,
        Name: 'IT Supplies Shop',
      },
      To: [
        {
          Email: to,
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
  
  console.log(result.body);
  return true;
};

//Direct API calls to this file are not allowed.
export default (req, res)=> res.status(404).json({message: 'Nothing to see here.'});
