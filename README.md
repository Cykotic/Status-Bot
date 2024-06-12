# Status Bot

The Status Bot is a Discord bot that monitors the online status of specified bots and sends updates to a specified channel.

## Setup

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Create a `.env` file in the root directory of the project and add the following environment variables:

    ```env
    TOKEN=<Your Discord Bot Token>
    MONITORED_BOT_IDS=<Comma-separated IDs of the bots you want to monitor>
    CHANNEL_ID=<ID of the channel where you want to send updates>
    ```

## Usage

Once you've set up the bot, you can start it by running `node index.js` (or whatever your entry point file is named). The bot will then start monitoring the online status of the specified bots and send updates to the specified channel whenever a bot goes online or offline.

## Features

- **Online/Offline Status Monitoring:** The bot monitors the online status of specified bots and sends an update whenever a bot goes online or offline.
- **Embed Messages:** The bot sends updates in the form of embed messages, which include the bot's name, the time of the status change, and the new status.

## Dependencies

- discord.js: A powerful library for interacting with the Discord API.
- dotenv: A module that loads environment variables from a `.env` file into `process.env`.
