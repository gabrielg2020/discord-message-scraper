import * as path from 'path';
import { Database } from 'sqlite3';
import * as fs from 'fs';
import { error } from 'console';

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
      this.connect()
    }
  }

  private connect() {
    this.db = new Database(this.filePath, (error) => {
      if (error) {
        console.error('An error occured when connecting to database: ', error)
      } else {
        console.log(`Connected to database at: ${this.filePath}`)
      }
    });
  }

  private initialiseSchema() {
    if (!this.db) {
      console.error('Database does not exist')
      return
    }

    const query: string = this.loadQuery('schema.sql');

    this.db.exec(query, (error) => {
      if (error) {
        console.error("An error occured when initialising schema: ", error);
      } else {
        console.log("Schema has been successfully initialised!");
      }
    });
  }

  public addMessage(messageContent: string, timestamp: Date) {
    if (!this.db) {
      console.error('Database does not exist')
      return
    }

    const query: string = `INSERT INTO messages (content, timestamp, isRelevant) VALUES (?, ?, 0)`;

    this.db.run(query, [messageContent, timestamp.toISOString()], (error) => {
      if (error) {
        console.error("An error occured when initialising schema: ", error);
      } else {
        console.log("Schema has been successfully initialised!");
      }
    });
  }

  private loadQuery(fileName: string): string {
    const queryFilePath: string = path.join(__dirname, `../db/${fileName}`)
    if (!fs.existsSync(queryFilePath)) {
      throw error(`file at ${queryFilePath} does not exist`);
    }

    return fs.readFileSync(queryFilePath, 'utf-8');
  }
}
