package database

import (
	"database/sql"

	"github.com/gabrielg2020/discord-message-scraper/logger"
	_ "github.com/mattn/go-sqlite3"
)

func MessageCount() int {
	db := getDB()
	defer db.Close()

	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM messages").Scan(&count)
	if err != nil {
		logger.Errorf("An error occured when counting messages: %v", err)
	}

	return count
}

func getDB() *sql.DB {
	db, err := sql.Open("sqlite3", "../src/db/database.db")
	if err != nil {
		logger.Errorf("An error occured when opening database: %v", err)
	}

	err = db.Ping()
	if err != nil {
		logger.Errorf("Unable to connect to database: %v", err)
		return nil
	}

	return db
}
