//const renderEjs = require('../services/render_ejs');
const path = require('path');
const fs = require('fs');
const nanoid = require('nanoid');
const wooApi = require('../../services/woo_api');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../constants');

const verifyMagicLink = async (req, res, Clients)=> {
  const {authKey} = req.params;
  res.setHeader('Content-Type', 'text/html');
  const p = n => console.log(n);

  p(1);
  const client = Clients.get(authKey);

  if (!client) {
    p(2)
    const templatePath = path.join(__dirname, 'templates/invalid_magic_link.html');
    const message = fs.readFileSync(templatePath).toString();
    res.status(498).send(message);
    p(3)
    return;
  }

  p(4)
  let {data: [user]} = await wooApi.get("customers", {email: client.email})
    .catch(err => {
      p(err.response ? err.response.data.message : err.message);
      return {data: [null]};
    });

  if (!user) {
    p(5);
    (
      {data: user} = await wooApi.post('customers', {
        email: client.email,
        username: client.email
          .slice(0, client.email.indexOf('@')) + nanoid(5),
        password: nanoid(8),
      })
      .catch(err => {
        p(err.response ? err.response.data.message : err.message);        
        return {data: null};
      })
    );

    p(client.email
      .slice(0, client.email.indexOf('@')) + nanoid(5));
  }

  if (!user) {
    p(8)
    const templatePath = path.join(__dirname, 'templates/server_error.html');
    const message = fs.readFileSync(templatePath).toString();
    res.status(504).send(message);
    client.sendEvent('error', 'Could not get or create user.');
    return;
  }

  p(user.role + ' ' + user.username);

  const tokenPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '366d' });

  p(9)
  
  client.sendEvent('authenticated', token);
  Clients.delete(authKey);
  p(10)

  const templatePath = path.join(__dirname, 'templates/authenticated.html');
  const message = fs.readFileSync(templatePath).toString();
  //res.status(498).send(renderEjs(templatePath, {}));
  res.status(201).send(message);
};

module.exports = verifyMagicLink;
