const fs = require('fs');
const https = require('https');
const http = require('http');

const { app } = require('./app');
const securePort = process.env.SSL_PORT || 3443;
const port = process.env.PORT || 3000;

let key = fs.readFileSync('sslcert/localhost.key', 'utf8');
let cert = fs.readFileSync('sslcert/localhost.cert', 'utf8');

let options = {
    key,
    cert,
    requestCert: false,
    rejectUnauthorized: false
};

let httpsServer = https.createServer(options, app);
let httpServer = http.createServer(app);

httpsServer.listen(securePort, () => {
  console.log(`Secure server running on port ${ securePort }`);
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${ port }`);
});

