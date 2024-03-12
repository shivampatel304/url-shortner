const { customAlphabet } = require('nanoid');
const { URLShortener, URLShortenerA, URLShortenerB } = require('../db');
const { determineDatabase, getModelForDatabase } = require('./findDatabase');
const { topUrlsCache } = require('./cache');

async function redirectHandler(req,res){
    try {
      const { shortUrl } = req.params;

      const database = determineDatabase(shortUrl);

      const urlshortner = getModelForDatabase(database);

      // Check if the URL is already in the cache
      const cachedData = topUrlsCache.get(shortUrl);
      if(cachedData){
        console.log(`URL found in cache: ${shortUrl}`);

        // Update Cached Access Count
        updateCacheAccessCount(shortUrl, cachedData.access_count + 1);
        res.redirect(cachedData.original_url);
        return;
      }
      
      // find a record in the URLShortener table based on the short URL
      const result = await urlshortner.findOne({
          attributes: ['original_url','access_count'],
          where: {
              short_url: shortUrl,
          },
      });

      

      let originalUrl = null;
    
      if(result){
        originalUrl = result.original_url;
        console.log(`Original Url  : ${originalUrl}`);
        const newAccessCount = result.access_count + 1;
        if(topUrlsCache.keys().length < 2){
          topUrlsCache.set(shortUrl,{ access_count: newAccessCount, original_url: originalUrl });
          console.log(`added to cache size is less than 2 : ${topUrlsCache.keys()}`);
        }else{
          await urlshortner.update({ access_count: newAccessCount }, 
            { where: { short_url: shortUrl } });

  
          const cachedUrls = topUrlsCache.keys();
  
          const sortedUrls = cachedUrls.sort((a,b) => topUrlsCache.get(a).access_count - topUrlsCache.get(b).access_count);
          console.log(`sorted urls : ${sortedUrls}`);
          if(topUrlsCache.get(sortedUrls[0]).access_count < newAccessCount){
            const cacheObject = topUrlsCache.get(sortedUrls[0]);
            console.log(cacheObject);
            const cacheShortUrl = sortedUrls[0];
            const cacheDatabase = determineDatabase(cacheShortUrl);
            const cacheUrlshortner = getModelForDatabase(cacheDatabase);
            const record = await cacheUrlshortner.findOne({
              attributes: ['access_count'],
              where: {
                short_url: cacheShortUrl,
              },
            })

            console.log(`records insert : ${record}`);
  
            const update = await cacheUrlshortner.update({ access_count: cacheObject.access_count }, 
            { where: { short_url: cacheShortUrl } });
            
            console.log(`records update : ${update}`);

            topUrlsCache.del(cacheShortUrl);
            console.log(`${cacheShortUrl} deleted`);
            topUrlsCache.set(shortUrl,{ access_count: newAccessCount, original_url: originalUrl });
            console.log(`${shortUrl} new object added`);
          }
        }
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

function updateCacheAccessCount(shortUrl, newAccessCount){
  const cachedData = topUrlsCache.get(shortUrl);
  console.log(cachedData);
  if(cachedData){
    cachedData.access_count = newAccessCount;
    topUrlsCache.set(shortUrl, cachedData);
  }
}

module.exports = {redirectHandler};