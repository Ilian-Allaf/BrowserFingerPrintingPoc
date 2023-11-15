const express = require('express');
const https = require('https');
const fs = require('fs');
const { trackClientHellos } = require('read-tls-client-hello');
const { MongoClient } = require("mongodb");
require('dotenv').config()

const client = new MongoClient(process.env.MONGO_URI);
const app = express();

const options = {
  hostname: 'localhost', 
  port: 443, 
  key: fs.readFileSync('selfsigned.key'),
  cert: fs.readFileSync('selfsigned.crt'),
  minVersion: "TLSv1.1",
  maxVersion: "TLSv1.3",
  enableTrace: false // Change to true to log tls client hello data
}

const server = https.createServer(options, app);
trackClientHellos(server); 

// Middleware
app.use('/test', async (req, res, next) => {
  try {
    const ja3 = req.socket.tlsClientHello.ja3;

    // Connect to MongoDB
    await client.connect();

    // Select DB and Collection
    const database = client.db("fingerprinting-db");
    const collection = database.collection("ja3");

    // Insert ja3 in DB
    await collection.insertOne({ ja3 });

    console.log('ja3:', ja3);

    next();
  } catch (error) {
    console.error("Error while inserting in the database:", error);
    res.status(500).json({ error: "Server Error" });
  }
});


// Route GET simple
app.get('/test', (req, res) => {
  res.json({ message: 'Hello, this is a response from your Express API !' });
});

server.listen(443, () => {
  console.log("HTTPS Server is running on port port 443");
});



















