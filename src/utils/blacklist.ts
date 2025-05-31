import * as fs from "node:fs";
import * as path from "node:path";

export class Blacklist {
	private readonly members: string[];

	constructor() {
		try {
			const filepath = path.join(__dirname, "../blacklist.json");
			const fileData = fs.readFileSync(filepath, "utf-8");
			this.members = JSON.parse(fileData);
		} catch (error) {
			this.members = [];
			console.error("An error occured when creating blacklist: ", error);
			throw error;
		}
	}

	public get memebers(): string[] {
		return this.members;
	}

	public isMemberBlacklisted(username: string): boolean {
		return this.members.includes(username);
	}
}
