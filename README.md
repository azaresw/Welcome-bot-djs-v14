# Welcome-bot-djs-v14
A powerful and customizable Discord bot for managing welcome messages and embeds. This bot allows server administrators to configure welcome messages, embed colors, images, and even direct messages for new members.  

## Features  
✅ Set a custom welcome message with placeholders (`{user}`, `{server}`, `{membercount}`)  
✅ Configure an embed with a title, color, and image  
✅ Send personalized welcome messages via direct messages  
✅ Slash command support for easy configuration  
✅ Stores settings per server using JSON  

## Commands  
- `/setwelcome <channel>` – Set the welcome message channel  
- `/setwelcomemsg <message>` – Customize the welcome message  
- `/setwelcomecolor <color>` – Set the embed color (HEX)  
- `/setwelcomeimage <image_url>` – Set the embed image  
- `/setdmwelcome <message>` – Set a DM welcome message  
- `/setdmcolor <color>` – Set the DM embed color  
- `/setdmimage <image_url>` – Set the DM embed image  
- `/welcomeconfig` – View current welcome settings  

## Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/azaresw/Welcome-bot-djs-v14.git
   cd discord-welcome-bot
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Configure your bot:  
   - Edit `config.json` and add your bot token  
4. Start the bot:  
   ```bash
   node index.js
   ```  

## Requirements  
- Node.js v20+  
- Discord.js v14  

## Contributing  
Pull requests are welcome! Feel free to submit bug reports and feature suggestions.  

## Need Support
join my server https://discord.dozziedevelopment.xyz for support
