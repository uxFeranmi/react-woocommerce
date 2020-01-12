const {DOMAIN_NAME = ''} = require('../../constants');

const setAuthCookie = (req, res)=> {
  let token =  req.header('Authorization'); // Same as req.get('Authorization');

  console.log(token);
  token = token.replace('Bearer', '').trim();

  console.log(token, '<');
  if (!token) {
    res.status(400).send('No data found. Nothing to put in the cookie.');
    return;
  }

  const secure = DOMAIN_NAME.startsWith('https:') ? 'Secure;' : '';

  res.writeHead(201, {
    'Content-Type': 'text/plain',
    'Set-Cookie': `token=${token}; ${secure} HttpOnly; Max-Age=31540000`,
  });
  
  res.end("Here's your cookie. Want some milk? 😊");
};

module.exports = setAuthCookie;
