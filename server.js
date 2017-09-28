// ------------------------------------------------------------------------------
// server.js
//
// Configure HTTPS and HTTP servers and run express app.
// ------------------------------------------------------------------------------

// Node modules
const fs = require('fs');
const https = require('https');
const http = require('http');

// Server variables and express app
const { app } = require('./app');
const securePort = process.env.SSL_PORT || 3443;
const port = process.env.PORT || 3000;

// ------------------------------------------------------------------------------
// Create and run servers
// ------------------------------------------------------------------------------

// Read key and certificate for HTTPS server
let key = fs.readFileSync('sslcert/localhost.key', 'utf8');
let cert = fs.readFileSync('sslcert/localhost.cert', 'utf8');

// Setup HTTPS options
let options = {
    key,
    cert,
    requestCert: false,
    rejectUnauthorized: false
};

// Run servers on configured ports
let httpsServer = https.createServer(options, app);
let httpServer = http.createServer(app);

httpsServer.listen(securePort, () => {
  console.log(`Secure server running on port ${ securePort }`);
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${ port }`);
});

// ------------------------------------------------------------------------------

