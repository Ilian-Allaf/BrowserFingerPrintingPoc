const express = require('express');
const https = require('https');
const fs = require('fs');
const { trackClientHellos } = require('read-tls-client-hello');

// const server = new https.Server({ /* your TLS options etc */ });

// trackClientHellos(server); // <-- Automatically track everything on this server

// server.on('request', (request, response) => {
//     // In your normal request handler, check `tlsClientHello` on the request's socket:
//     console.log('Received request with TLS client hello:', request.socket.tlsClientHello);
// });

//---------------------------------------------------------------------------------------------

const app = express();

const options = {
  hostname: 'localhost', 
  port: 443, 
  key: fs.readFileSync('selfsigned.key'),
  cert: fs.readFileSync('selfsigned.crt'),
  minVersion: "TLSv1.1",
  maxVersion: "TLSv1.3",
  enableTrace: false
}

const server = https.createServer(options, app);
trackClientHellos(server); 

// Route GET simple
app.get('/api/hello', (req, res) => {
  console.log('Received request with TLS client hello:', req.socket.tlsClientHello, req.socket.autoSelectFamilyAttemptedAddresses);
  res.json({ message: 'Bonjour, ceci est une réponse de votre API Express en HTTPS !' });
});

server.listen(443, () => {
  console.log("Serveur HTTPS en cours d'exécution sur le port 443");
});





















