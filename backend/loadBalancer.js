// loadBalancer.js
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

// Define the addresses of your backend servers
const serverAddresses = [
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
];

// Create the load balancer server
const loadBalancer = http.createServer((req, res) => {
  // Choose a backend server randomly
  const targetServer = serverAddresses[Math.floor(Math.random() * serverAddresses.length)];

  // Proxy the request to the chosen server
  console.log(`request made to ${targetServer}`);
  proxy.web(req, res, { target: targetServer });
});

// Listen on port 3000 (or your desired port)
const port = 3000;
loadBalancer.listen(port, () => {
  console.log(`Load balancer listening on port ${port}`);
});
