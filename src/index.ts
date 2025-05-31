import { Client, Events, GatewayIntentBits } from "discord.js";
import type { GuildChannel } from "discord.js";
import * as dotenv from "dotenv";
import { Blacklist } from "./utils/blacklist";
import { DatabaseManager } from "./utils/db";

// Load env variables
dotenv.config();

// Create and initalise DatabaseManager
const dbManager = new DatabaseManager();

// Create Client
const client = new Client({
	intents: [
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	],
});

// Create Blacklist
const blacklist = new Blacklist();

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	console.log(`Blacklist: ${blacklist.memebers}`);
});

// Listen for messages
client.on(Events.MessageCreate, async (message) => {
  // Default
  let textContent = "Blocked Message Content";
  let timestamp = new Date();
  let channelName = "Blocked Message Channel";
  let messageID = "Blocked Message ID";

	if (!blacklist.isMemberBlacklisted(message.author.username)) {
    // Get data
    textContent = message.content;
    timestamp = new Date(message.createdTimestamp);
    channelName = (message.channel as GuildChannel).name;
    messageID = message.id;

    // Check for attachments
    for (const [_, attachment] of message.attachments) {
      dbManager.addAttachment(attachment.url, messageID);
    }
  }
  
  // Store in database
	dbManager.addMessage(textContent, timestamp, channelName, messageID);
});

client.login(process.env.DISCORD_TOKEN);
