//import renderEjs from '../../../services/render_ejs';
import path from 'path';
import fs from 'fs';
import nanoid from 'nanoid';
import wooApi from '../../../services/woo_api';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

export const handleMagicLink = (req, res, Clients, authKey)=> {
  const client = Clients.get(authKey);

  if (!client) {
    const templatePath = path.join(__dirname, 'templates/invalid_magic_link.html');
    const message = fs.readFileSync(templatePath).toString();
    //res.status(498).send(renderEjs(templatePath, {}));
    res.status(498).send(message);
    return;
  }

  const [user] = await wooApi.get("customers", {email: client.email})
    .catch((error)=> {
      const {response} = error;
      if (response && response.status == 404) {
        const newUser = wooApi.post('users', {
          email: client.email,
          username: client.email
            .slice(0, client.email.indexOf('@')) + nanoid(5),
        });
        return newUser;
      }
    });

  if (!user) {
    const templatePath = path.join(__dirname, 'templates/server_error.html');
    const message = fs.readFileSync(templatePath).toString();
    //res.status(498).send(renderEjs(templatePath, {}));
    res.status(500).send(message);
    return;
  }

  const tokenPayload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '366d' });

  client.res.write(
    `event: authenticated\n
    data: ${token}\n\n
    id: authenticated:${authKey}\n`
  );
  Clients.delete(authKey);

  const templatePath = path.join(__dirname, 'templates/authenticated.html');
  const message = fs.readFileSync(templatePath).toString();
  //res.status(498).send(renderEjs(templatePath, {}));
  res.status(201).send(message);
};

//Direct API calls to this file are not allowed.
export default (req, res)=> res.status(404).json({message: 'Nothing to see here.'});
