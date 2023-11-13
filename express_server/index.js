const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`Requête entrante: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Express!');
});

app.listen(port, () => {
  console.log(`Le serveur Express écoute sur le port ${port}`);
});

