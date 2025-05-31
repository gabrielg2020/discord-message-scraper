CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  messageID TEXT UNIQUE NOT NULL, -- This is the Discord message id
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  isRelevant INTEGER NOT NULL,
  channel TEXT NOT NULL,
  conversationID INTEGER,
  FOREIGN KEY (conversationID) REFERENCES conversation(id)
);

CREATE TABLE conversation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic TEXT NOT NULL
);

CREATE TABLE attachments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  messageID TEXT NOT NULL,
  FOREIGN KEY (messageID) REFERENCES messages(messageID)
);

