import { error } from "node:console";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "sqlite3";

export class DatabaseManager {
	private readonly filePath: string = path.join(__dirname, "../db/database.db");
	private db: Database | null = null;

	constructor() {
		// Check if database exisits
		if (!fs.existsSync(this.filePath)) {
			console.log(`Creating database at: ${this.filePath}`);
			this.connect();
			this.initialiseSchema();
		} else {
			this.connect();
		}
	}

	private connect() {
		this.db = new Database(this.filePath, (error) => {
			if (error) {
				console.error("An error occured when connecting to database: ", error);
			} else {
				console.log(`Connected to database at: ${this.filePath}`);
			}
		});
	}

	private initialiseSchema() {
		if (!this.db) {
			console.error("Database does not exist");
			return;
		}

		const query: string = this.loadQuery("schema.sql");

		this.db.exec(query, (error) => {
			if (error) {
				console.error("An error occured when initialising schema: ", error);
			} else {
				console.log("Schema has been successfully initialised!");
			}
		});
	}

	public addMessage(
		messageContent: string,
		timestamp: Date,
		channel: string,
		messageID: string,
	) {
		if (!this.db) {
			console.error("Database does not exist");
			return;
		}

		const query: string =
			"INSERT INTO messages (content, timestamp, isRelevant, channel, messageID) VALUES (?, ?, 0, ?, ?)";

		this.db.run(
			query,
			[messageContent, timestamp.toISOString(), channel, messageID],
			(error) => {
				if (error) {
					console.error("An error occured when adding a message: ", error);
				} else {
					console.log("Message has been successfully added!");
				}
			},
		);
	}

	public addAttachment(url: string, messageID: string) {
		if (!this.db) {
			console.error("Database does not exist");
			return;
		}

		const query: string =
			"INSERT INTO attachments (url, messageID) VALUES (?, ?)";

		this.db.run(query, [url, messageID], (error) => {
			if (error) {
				console.error("An error occured when adding an attachement ", error);
			} else {
				console.log("Attachement has been successfully added!");
			}
		});
	}

	private loadQuery(fileName: string): string {
		const queryFilePath: string = path.join(__dirname, `../db/${fileName}`);
		if (!fs.existsSync(queryFilePath)) {
			throw error(`file at ${queryFilePath} does not exist`);
		}

		return fs.readFileSync(queryFilePath, "utf-8");
	}
}
