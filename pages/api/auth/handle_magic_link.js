//import renderEjs from '../../../services/render_ejs';
import path from 'path';
import fs from 'fs';
import nanoid from 'nanoid';
import wooApi from '../../../services/woo_api';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');
const cd = 'pages/api/auth';

export const handleMagicLink = async (req, res, Clients, authKey)=> {
  const p = n => console.log(n);

  p(1);
  const client = Clients.get(authKey);

  if (!client) {
    p(2)
    const templatePath = path.join(process.cwd(), cd, 'templates/invalid_magic_link.html');
    const message = fs.readFileSync(templatePath).toString();
    //res.status(498).send(renderEjs(templatePath, {}));
    res.setHeader(content-type: html)
    res.status(498).send(message);
    p(3)
    return;
  }

  p(4)
  const [user] = await wooApi.get("customers", {email: client.email})
    .catch((error)=> {
      p(5)
      const {response} = error;
      if (response && response.status == 404) {
        p(6)
        const newUser = wooApi.post('users', {
          email: client.email,
          username: client.email
            .slice(0, client.email.indexOf('@')) + nanoid(5),
        });
        p(7)
        return newUser;
      }
    });

  if (!user) {
    p(8)
    const templatePath = path.join(process.cwd(), cd, 'templates/server_error.html');
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

  p(9)
  client.res.write(
    `event: authenticated\n
    data: ${token}\n\n
    id: authenticated:${authKey}\n`
  );
  Clients.delete(authKey);
  p(10)

  const templatePath = path.join(process.cwd(), cd, 'templates/authenticated.html');
  const message = fs.readFileSync(templatePath).toString();
  //res.status(498).send(renderEjs(templatePath, {}));
  res.status(201).send(message);
};

//Direct API calls to this file are not allowed.
export default (req, res)=> res.status(404).json({message: 'Nothing to see here.'});
