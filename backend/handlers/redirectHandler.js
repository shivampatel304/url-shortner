const { customAlphabet } = require('nanoid');
const { URLShortener } = require('../db');

async function redirectHandler(req,res){
    try {
    const { shortUrl } = req.params;
    
    // find a record in the URLShortener table based on the short URL
    const result = await URLShortener.findOne({
        attributes: ['original_url'],
        where: {
            short_url: shortUrl,
        },
    });

    let originalUrl = null;

    if(result != null){
      originalUrl = result.original_url;
    }

   
    if (originalUrl) {
      res.redirect(originalUrl);
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
    } catch (error) {
    console.error('Error retrieving original URL:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

module.exports = {redirectHandler};