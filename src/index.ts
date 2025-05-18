import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

// Load env variables
dotenv.config();

// Create Client
const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
  ]
})

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

// Listen for messages
client.on(Events.MessageCreate, async (message) => {
  console.log(message.content)
  if (message.content === '!ping') {
    await message.reply('Pong!');
  }
});

client.login(process.env.DISCORD_TOKEN);
