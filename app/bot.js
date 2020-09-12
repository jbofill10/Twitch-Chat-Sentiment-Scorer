const TwitchBot = require('twitch-bot')
const {Client} = require('pg')

require('dotenv').config()

const client = new Client({
  connectionString: process.env.PSQL_CONNECTIONSTRING
})

var channel = process.env.CHANNEL
var queryString = `INSERT INTO ${channel}(name, displayname, message, subscriber, user_type, subscriptionlength) VALUES ($1, $2, $3, $4, $5, $6);`

console.log("[Chat Miner]: Mining the chat of : " + channel);

client.connect(err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Connected to PSQL!')

    const Bot = new TwitchBot({
      username: process.env.BOT_NAME,
      oauth: process.env.OAUTH_TOKEN,
      channels: [channel]
    })
     
    Bot.on('join', channel => {
      console.log(`Joined channel: ${channel}`)
    })
     
    Bot.on('error', err => {
      console.log(err)
    })
     
    Bot.on('message', chatter => {
      if (chatter.username === 'schnozebot') return

      var sub_length = chatter.subscriber ? chatter.badges.subscriber : null

      var values = [chatter.username, chatter.display_name, chatter.message, chatter.subscriber, chatter.user_type, sub_length]

      client.query(queryString, values)
          .then(res => {})
          .catch(e => {
            console.log("COULD NOT INSERT INTO PSQL!")
            console.error(e)
      })

    })
  }
})
