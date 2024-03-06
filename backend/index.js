const express = require('express');
const {shortenUrlHandler}= require('./handlers/shortenUrlHandler');
const { redirectHandler } = require('./handlers/redirectHandler');

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to create a short URL
app.post('/shorten', shortenUrlHandler);

// end point to redirect to original URL using short url
app.get('/:shortUrl', redirectHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});