const { customAlphabet } = require('nanoid');
const { URLShortener } = require('../db');

// creating a base 62 (26 small + 26 capital + 10 numbers) alphabet string
const base62Alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';


async function shortenUrlHandler(req,res){
    try{
        const { originalUrl, expiredAt } = req.body;
        
        // creating base62 nanoid
        const nanoid = customAlphabet(base62Alphabet,7);
        const shortUrl = nanoid();
        
        // storing it in database
        await URLShortener.create({
            original_url: originalUrl,
            short_url: shortUrl,
            expired_at: expiredAt,
        });
    
        res.json({ shortUrl });
        } catch (error) {
        console.error('Error creating short URL:', error.message);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}


module.exports = {shortenUrlHandler};





