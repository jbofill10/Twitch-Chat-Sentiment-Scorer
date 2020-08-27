const TwitchBot = require('twitch-bot')

require('dotenv').config()


const Bot = new TwitchBot({
  username: process.env.BOT_NAME,
  oauth: process.env.OAUTH_TOKEN,
  channels: ['xqcow']
})
 
Bot.on('join', channel => {
  console.log(`Joined channel: ${channel}`)
})
 
Bot.on('error', err => {
  console.log(err)
})
 
Bot.on('message', chatter => {
    message = {
      name: chatter.username,
      displayName: chatter.display_name,
      text: chatter.message,
    }

    console.log(message)
})