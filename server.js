const express = require('express');
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next)=> {
  // req.parsedUrl.pathname, req.parsedUrl.query
  // @ts-ignore
  req.parsedUrl = parse(req.url, true);
  next();
})

mountEndpoints(app);

app.use('/shop', (req, res)=> {
  // @ts-ignore
  nextJs.render(req, res, '/', req.parsedUrl.query)
});

// @ts-ignore
app.use((req, res) => nextJsHandler(req, res, req.parsedUrl));

console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

nextJs.prepare().then(() => {
  // Start server on 3000 port
  app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`));
});

/*
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
app.use(cors(corsOptions));


// Define endpoints
app.use('/eventpage', express.static('eventsource'));
app.get('/events', eventsHandler);
app.get('/status', (req, res) => res.json({clients: clients.length}));

let clients = [];
let nests = ['Message 1'];
*/
