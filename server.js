const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const next = require('next');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const nextJs = next({ dev });
const nextJsHandler = nextJs.getRequestHandler();

let count = 2;
// Middleware for GET /events endpoint
function eventsHandler(req, res, next) {
  // Mandatory headers and http status to keep connection open
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  };
  res.writeHead(200, headers);

  // After client opens connection send all nests as string
  const data = `data: ${JSON.stringify(nests)}\n\n`;
  res.write(data);

  // Generate an id based on timestamp and save res
  // object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res
  };
  clients.push(newClient);

  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(c => c.id !== clientId);
  });

  setTimeout(()=> addNest(count++), 1500);
}

// Iterate clients list and use write res object method to send new nest
function sendEventsToAll(newNest) {
  clients.forEach(c => c.res.write(`data: ${JSON.stringify(newNest)}\n\n`))
}

// Add nest
function addNest(count) {
  const newNest = `Message ${count}`;
  nests.push(newNest);

  // Invoke iterate-and-send function
  return sendEventsToAll(newNest);
}

// Set cors and bodyParser middlewares
/*corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));*/

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next)=> {
  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  //parsedUrl.pathname, parsedUrl.query }
  req.parsedUrl = parse(req.url, true);
  next();
})

  

  if (pathname === '/shop') {
    nextJs.render(req, res, '/', query)
  } else if (pathname === '/b') {
    nextJs.render(req, res, '/a', query)
  }

// Define endpoints
app.use('/eventpage', express.static('eventsource'));
app.get('/events', eventsHandler);
app.get('/status', (req, res) => res.json({clients: clients.length}));

app.use((req, res) => nextJsHandler(req, res, req.parsedUrl));

const PORT = 3000;

let clients = [];
let nests = ['Message 1'];

nextJs.prepare().then(() => {
  createServer(
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

// Start server on 3000 port
app.listen(PORT, () => console.log(`Swamp Events service listening on port ${PORT}`));
