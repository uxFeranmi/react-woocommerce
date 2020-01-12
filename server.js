require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const nextJs = require('next')({ dev });

const checkAuth = require('./api/services/check_auth');
const mountEndpoints = require('./api/endpoints');

const app = express();
const nextJsHandler = nextJs.getRequestHandler();

console.log(process.env.DOMAIN_NAME); 

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=> {
  // req.parsedUrl.pathname, req.parsedUrl.query
  req.parsedUrl = parse(req.url, true);
  next();
})

// Verify jwt.
app.use('/api/*', checkAuth);

// Mount api endpoints.
mountEndpoints(app);

app.use('/shop', (req, res)=> {
  nextJs.render(req, res, '/', req.parsedUrl.query);
});

app.use((req, res) => nextJsHandler(req, res, req.parsedUrl));

const PORT = process.env.PORT || 3000;

nextJs.prepare().then(() => {
  app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`));
});
