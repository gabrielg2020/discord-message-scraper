import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { Blacklist } from './utils/blacklist';
import { DatabaseManager } from './utils/db';

// Load env variables
dotenv.config();

// Create and initalise DatabaseManager
const dbManager = new DatabaseManager;

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
    dbManager.addMessage(message.content, new Date(message.createdTimestamp));
  } else {
    dbManager.addMessage("Blocked Message", new Date());
  }
});

client.login(process.env.DISCORD_TOKEN);
