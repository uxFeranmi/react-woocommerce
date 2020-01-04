export const handleMagicLink = (req, res, Clients, authKey)=> {
  const client = Clients.get(authKey);

  if (!client) {
    res.status(498).sendFile('invalid_magic_link.html');
    return;
  }

  const user = await wooApi.get('users', {email: client.email})
    .catch((error)=> {
      const {response} = error;
      if (response && response.status == 404) 
      return wooApi.post('users', {
        email: client.email,
        username: client.email
          .slice(client.email.indexOf('@')),
        password: nanoid(8),
      });
    });

  if (!user) {
    res.status(500).sendFile('server_error.html');
    return;
  }

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    email: user.email,
  });

  client.res.write({event: 'authenticated', data: token});

  res.status(201).sendFile('auth_success.html');

  Clients.delete(authKey);
};

const noRouteMessage = JSON.stringify({message: 'Nothing to see here.'});
export default (req, res)=> res.status(404).send(noRouteMessage);
