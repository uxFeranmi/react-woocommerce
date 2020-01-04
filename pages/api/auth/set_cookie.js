export default (req, res)=> {
  const token =  req.header['Authorization'] ?
    req.header['Authorization'].replace('Bearer ', '')
    : null;

  if (!token) {
    res.status(400).send('No data found. Nothing to put in the cookie.');
    return;
  }
  
  res.cookie = {token};

  res.status(201).send("Here's your cookie. Want some milk? 😊");
};
