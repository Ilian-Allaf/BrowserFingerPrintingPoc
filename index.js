const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const options = {
  hostname: 'localhost', 
  port: 443, 
  key: fs.readFileSync('selfsigned.key'),
  cert: fs.readFileSync('selfsigned.crt'),
  minVersion: "TLSv1.1",
  maxVersion: "TLSv1.3",
  enableTrace: true
}

const server = https.createServer(options, app);

// Route GET simple
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bonjour, ceci est une réponse de votre API Express en HTTPS !' });
});

server.listen(443, () => {
  console.log("Serveur HTTPS en cours d'exécution sur le port 443");
});











// // Custom middleware to print request information
// app.use((req, res, next) => {
  
//   // console.log('Request received:');
//   // console.log('Headers:', req.headers);
//   // console.log('TLS Version:', req.connection.getProtocol());
//   // console.log('Cipher Suite:', req.connection.getCipher().name);
//   // next(); // Continue processing the request
// });



















