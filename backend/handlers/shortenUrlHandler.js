const { customAlphabet } = require('nanoid');
const { URLShortener, URLShortenerA, URLShortenerB, db, dbA, dbB } = require('../db');
const { determineDatabase, getModelForDatabase } = require('./findDatabase');

// creating a base 62 (26 small + 26 capital + 10 numbers) alphabet string
const base62Alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';


async function shortenUrlHandler(req,res){
    try{
        const { originalUrl, expiredAt } = req.body;


        // checking if the original url is already existed in our database
        const result = await URLShortener.findOne({
            attributes: ['short_url'],
            where: {
                original_url: originalUrl,
            },
        });

        const resultA = await URLShortenerA.findOne({
            attributes: ['short_url'],
            where: {
                original_url: originalUrl,
            },
        });

        const resultB = await URLShortenerB.findOne({
            attributes: ['short_url'],
            where: {
                original_url: originalUrl,
            },
        });

        // if presented then return the shorturl else create a new short url and add it to db
        if(result != null){
            const reply = result.short_url;
            res.json({ reply });
        }else if(resultA != null){
            const reply = resultA.short_url;
            res.json({reply});
        }else if(resultB != null){
            const reply = resultB.short_url;
            res.json({reply});
        }else{
            // creating base62 nanoid
            const nanoid = customAlphabet(base62Alphabet,7);
    
            const shortUrl = nanoid();
        
            const database = determineDatabase(shortUrl);
           
            const urlshortner = getModelForDatabase(database);
           
            
            // storing it in database
            await urlshortner.create({
                original_url: originalUrl,
                short_url: shortUrl,
                expired_at: expiredAt,
            });
        
            res.json({ shortUrl });
        }
    } catch (error) {
        console.error('Error creating short URL:', error.message);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}


module.exports = {shortenUrlHandler};





