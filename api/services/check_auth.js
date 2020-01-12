const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

const checkAuth = (req, _res, next)=> {
  const {token} = req.cookies;
  req.auth = false;

  console.log(token);
  if (!token) return next();

  jwt.verify(token, JWT_SECRET, (err, decoded)=> {
    if (err) {
      console.log(err);
      console.log('Seems we received an invalid token from a client');
      return next();
    }

    req.auth = decoded;
    next();
  }); 
}

module.exports = checkAuth;