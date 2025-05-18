import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { Blacklist } from './utils/blacklist';

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

// Create Blacklist
const blacklist = new Blacklist;

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
  console.log(`Blacklist: ${blacklist.memebers}`)
})

// Listen for messages
client.on(Events.MessageCreate, async (message) => {
  if (!blacklist.isMemberBlacklisted(message.author.username)) {
    console.log(message.content)
  }
});

client.login(process.env.DISCORD_TOKEN);
