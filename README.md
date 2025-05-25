# Discord Scraper Bot

A simple bot that will listen to messages on a server (Guild) and store messages in a `sqlite` database.

## Data Disclosure

If you are going to use this on your own server please give members a way of opting out and add their username to `src/blacklist.json`. Usernames are **not** stored in the database.

## Local Setup

1. Cone Repo

    ```bash
    git clone git@github.com:gabrielg2020/discord-scraper-bot.git && cd discord-scraper-bot
    ```

2. Setup `.env`

    ```bash
    cp .env.dist .env && vim .env
    ```

    Follow the discord [documentation](https://discord.com/developers/docs/intro) on how to setup a bot and get `.env` variables.

3. Run Bot

    ### On local machine

    ```bash
    npm run dev
    ```

    ### On docker container

    ```bash
    docker build -f Dockerfile -t discord-scraper-bot .
    ```

    ```bash
    docker run --env-file .env discord-scraper-bot:latest
    ```
    ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with 💻 by Gabriel Guimaraes

