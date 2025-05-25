# --- Stage 1: Build ---

FROM node:23.10.0-alpine AS bot-builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY ./ ./

# Build the bot
RUN npm run build

# --- Stage 2: Run bot ---

FROM alpine:latest

WORKDIR /app

# Install node.js npm sqlite3
RUN apk add --no-cache nodejs npm sqlite

# Copy built files
COPY --from=bot-builder /app/dist /app/dist
COPY --from=bot-builder /app/node_modules /app/node_modules

# Run bot
CMD [ "node", "/app/dist/index.js" ]
