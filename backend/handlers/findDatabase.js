const {db,dbA,dbB, URLShortener,URLShortenerA,URLShortenerB} = require('../db');

function determineDatabase(shortUrl){
    const firstLetter = shortUrl.charAt(0).toLowerCase();
    console.log(firstLetter, 'color: red');
    if(firstLetter >= 'a' && firstLetter <= 'l'){
        return db;
    }else if(firstLetter > 'l' && firstLetter <= 'x'){
        return dbA;
    }else {
        return dbB;
    }
}

function getModelForDatabase(database){
    const nameofDatabase = database.config.database;
    if(nameofDatabase == 'url_shortner'){
        return URLShortener;
    }else if(nameofDatabase == 'url_shortner_a'){
        return URLShortenerA;
    }
    return URLShortenerB;
    
}

module.exports = {determineDatabase, getModelForDatabase};