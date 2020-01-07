const DOMAIN_NAME = require('../constants');

const setAuthCookie = (req, res)=> {
  let token =  req.header('Authorization'); // Same as req.get('Authorization');
  token = token.replace ?
    token.replace('Bearer ', '')
    : null;

  if (!token) {
    res.status(400).send('No data found. Nothing to put in the cookie.');
    return;
  }

  /* To set multiple cookies...
  res.setHeader('Set-Cookie', [
    'userid=ninja; HttpOnly; Max-Age=31540000',
    'language=javascript',
  ]);*/

  // @ts-ignore
  const secure = DOMAIN_NAME.startsWith('https:') ? 'Secure;' : '';

  res.writeHead(201, {
    'Content-Type': 'text/plain',
    'Set-Cookie': `token=${token}; ${secure} HttpOnly; Max-Age=31540000`,
  });
  
  res.end("Here's your cookie. Want some milk? 😊");
};

module.exports = setAuthCookie;
