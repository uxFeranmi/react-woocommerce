const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
// @ts-ignore
const nextJs = require('next')({ dev });

const app = express();
const nextJsHandler = nextJs.getRequestHandler();

const mountEndpoints = require('./api/endpoints');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next)=> {
  // req.parsedUrl.pathname, req.parsedUrl.query
  // @ts-ignore
  req.parsedUrl = parse(req.url, true);
  next();
})

// Mount api endpoints.
mountEndpoints(app);

app.use('/shop', (req, res)=> {
  // @ts-ignore
  nextJs.render(req, res, '/', req.parsedUrl.query)
});

// @ts-ignore
app.use((req, res) => nextJsHandler(req, res, req.parsedUrl));

const PORT = process.env.PORT || 3000;

nextJs.prepare().then(() => {
  // Start server on 3000 port
  app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`));
});
