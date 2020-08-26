require('dotenv').config('./.env')

const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: process.env.API_KEY});

function query(message){
  (async () => {
    const result = await perspective.analyze(message);
    console.log(JSON.stringify(result, null, 2));
  })();
}

module.exports = {query}