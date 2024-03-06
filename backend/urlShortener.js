const { URLShortener } = require('./db');

function generateShortUrl() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortUrl = '';

  for (let i = 0; i < 6; i++) {
    shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return shortUrl;
}

async function createShortUrl(originalUrl, expiredAt) {
  try {
    const shortUrl = generateShortUrl();

    const result = await URLShortener.create({
      original_url: originalUrl,
      short_url: shortUrl,
      expired_at: expiredAt,
    });

    return result.short_url;
  } catch (error) {
    throw error;
  }
}

async function getOriginalUrl(shortUrl) {
  try {
    const result = await URLShortener.findOne({
      attributes: ['original_url'],
      where: {
        short_url: shortUrl,
      },
    });

    return result ? result.original_url : null;
  } catch (error) {
    throw error;
  }
}

module.exports = { createShortUrl, getOriginalUrl };