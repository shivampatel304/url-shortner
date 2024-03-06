const express = require('express');
const urlShortener = require('./urlShortener');

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to create a short URL
app.post('/shorten', async (req, res) => {
  try {
    const { originalUrl, expiredAt } = req.body;

    // Call the createShortUrl function from urlShortener module
    const shortUrl = await urlShortener.createShortUrl(originalUrl, expiredAt);
    res.json({ shortUrl });
  } catch (error) {
    console.error('Error creating short URL:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.get('/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const originalUrl = await urlShortener.getOriginalUrl(shortUrl);

    if (originalUrl) {
      res.redirect(originalUrl);
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (error) {
    console.error('Error retrieving original URL:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});