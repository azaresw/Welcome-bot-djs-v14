const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, REST, Routes, PermissionsBitField } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
// ⭐ CREDITS: AZARESW | GITHUB: https://github.com/azaresw/Welcome-bot-djs-v14
// ⭐ DISCORD: https://dsc.gg/azeydev | SUPPORT, UPDATES, CUSTOM BOTS 
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const SETTINGS_FILE = "welcome_settings.json";
let welcomeSettings = fs.existsSync(SETTINGS_FILE) ? JSON.parse(fs.readFileSync(SETTINGS_FILE)) : {};

const saveSettings = () => fs.writeFileSync(SETTINGS_FILE, JSON.stringify(welcomeSettings, null, 2));
// ⭐ CREDITS: AZARESW | GITHUB: https://github.com/azaresw/Welcome-bot-djs-v14
// ⭐ DISCORD: https://dsc.gg/azeydev | SUPPORT, UPDATES, CUSTOM BOTS 
const replacePlaceholders = (text, member) => {
  return text
    .replace(/{user}/g, `<@${member.id}>`)
    .replace(/{username}/g, member.user.username)
    .replace(/{server}/g, member.guild.name)
    .replace(/{membercount}/g, member.guild.memberCount);
};

client.on("guildMemberAdd", async (member) => {
  const guildId = member.guild.id;
  if (!welcomeSettings[guildId]) return;

  const settings = welcomeSettings[guildId];
  const placeholders = replacePlaceholders(settings.message || `Welcome {user} to {server}!`, member);

  if (settings.channel) {
    const channel = member.guild.channels.cache.get(settings.channel);
    if (channel) {
      const embed = new EmbedBuilder()
        .setColor(settings.embedColor || "#00FF00")
        .setTitle(settings.embedTitle ? replacePlaceholders(settings.embedTitle, member) : "Welcome!")
        .setDescription(placeholders)
        .setImage(settings.image || null)
        .setThumbnail(member.user.displayAvatarURL());

      channel.send({ embeds: [embed] });
    }
  }
// ⭐ CREDITS: AZARESW | GITHUB: https://github.com/azaresw/Welcome-bot-djs-v14
// ⭐ DISCORD: https://dsc.gg/azeydev | SUPPORT, UPDATES, CUSTOM BOTS 
  if (settings.dmMessage) {
    const dmEmbed = new EmbedBuilder()
      .setColor(settings.dmEmbedColor || "#00FF00")
      .setTitle(settings.dmEmbedTitle ? replacePlaceholders(settings.dmEmbedTitle, member) : "Welcome!")
      .setDescription(replacePlaceholders(settings.dmMessage, member))
      .setImage(settings.dmImage || null);

    member.send({ embeds: [dmEmbed] }).catch(() => {});
  }
});

const commands = [
  new SlashCommandBuilder()
    .setName("setwelcome")
    .setDescription("Set the welcome channel")
    .addChannelOption(option => option.setName("channel").setDescription("Select the welcome channel").setRequired(true)),
  new SlashCommandBuilder()
    .setName("setwelcomemsg")
    .setDescription("Set the welcome message")
    .addStringOption(option => option.setName("message").setDescription("Welcome message with placeholders").setRequired(true)),
  new SlashCommandBuilder()
    .setName("setwelcomecolor")
    .setDescription("Set the welcome embed color")
    .addStringOption(option => option.setName("color").setDescription("HEX color code").setRequired(true)),
  new SlashCommandBuilder()
    .setName("setwelcomeimage")
    .setDescription("Set the welcome embed image")
    .addStringOption(option => option.setName("image").setDescription("Image URL").setRequired(true)),
  new SlashCommandBuilder()
    .setName("setdmwelcome")
    .setDescription("Set the DM welcome message")
    .addStringOption(option => option.setName("message").setDescription("DM message with placeholders").setRequired(true)),
  new SlashCommandBuilder()
    .setName("setdmcolor")
    .setDescription("Set the DM embed color")
    .addStringOption(option => option.setName("color").setDescription("HEX color code").setRequired(true)),
  new SlashCommandBuilder()
    .setName("setdmimage")
    .setDescription("Set the DM welcome image")
    .addStringOption(option => option.setName("image").setDescription("Image URL").setRequired(true)),
  new SlashCommandBuilder()
    .setName("welcomeconfig")
    .setDescription("Show current welcome settings"),
];
// ⭐ CREDITS: AZARESW | GITHUB: https://github.com/azaresw/Welcome-bot-djs-v14
// ⭐ DISCORD: https://dsc.gg/azeydev | SUPPORT, UPDATES, CUSTOM BOTS 
const rest = new REST({ version: "10" }).setToken(config.TOKEN);
client.once("ready", async () => {
  try {
    console.log("Deploying commands...");
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands.map(cmd => cmd.toJSON()) });
    console.log("Commands deployed!");
  } catch (error) {
    console.error("Error deploying commands:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return interaction.reply({ content: "❌ You need `Manage Server` permission to use this command!", ephemeral: true });
  }

  const guildId = interaction.guild.id;
  if (!welcomeSettings[guildId]) welcomeSettings[guildId] = {};
// ⭐ CREDITS: AZARESW | GITHUB: https://github.com/azaresw/Welcome-bot-djs-v14
// ⭐ DISCORD: https://dsc.gg/azeydev | SUPPORT, UPDATES, CUSTOM BOTS 
  switch (interaction.commandName) {
    case "setwelcome":
      welcomeSettings[guildId].channel = interaction.options.getChannel("channel").id;
      saveSettings();
      await interaction.reply(`✅ Welcome channel set to <#${welcomeSettings[guildId].channel}>`);
      break;

    case "setwelcomemsg":
      welcomeSettings[guildId].message = interaction.options.getString("message");
      saveSettings();
      await interaction.reply("✅ Welcome message updated!");
      break;

    case "setwelcomecolor":
      welcomeSettings[guildId].embedColor = interaction.options.getString("color");
      saveSettings();
      await interaction.reply("✅ Welcome embed color updated!");
      break;

    case "setwelcomeimage":
      welcomeSettings[guildId].image = interaction.options.getString("image");
      saveSettings();
      await interaction.reply("✅ Welcome embed image updated!");
      break;
// ⭐ CREDITS: AZARESW | GITHUB: https://github.com/azaresw/Welcome-bot-djs-v14
// ⭐ DISCORD: https://dsc.gg/azeydev | SUPPORT, UPDATES, CUSTOM BOTS 
    case "setdmwelcome":
      welcomeSettings[guildId].dmMessage = interaction.options.getString("message");
      saveSettings();
      await interaction.reply("✅ DM welcome message updated!");
      break;

    case "setdmcolor":
      welcomeSettings[guildId].dmEmbedColor = interaction.options.getString("color");
      saveSettings();
      await interaction.reply("✅ DM embed color updated!");
      break;

    case "setdmimage":
      welcomeSettings[guildId].dmImage = interaction.options.getString("image");
      saveSettings();
      await interaction.reply("✅ DM welcome image updated!");
      break;

    case "welcomeconfig":
      const settings = welcomeSettings[guildId] || {};
      const configEmbed = new EmbedBuilder()
        .setTitle("Welcome Configuration")
        .setColor("#3498db")
        .setDescription("Current welcome settings for this server.")
        .addFields(
          { name: "Channel", value: settings.channel ? `<#${settings.channel}>` : "Not set", inline: true },
          { name: "Message", value: settings.message || "Not set", inline: true },
          { name: "Embed Color", value: settings.embedColor || "Not set", inline: true },
          { name: "Image", value: settings.image || "Not set", inline: true },
          { name: "DM Message", value: settings.dmMessage || "Not set", inline: true },
          { name: "DM Embed Color", value: settings.dmEmbedColor || "Not set", inline: true },
          { name: "DM Image", value: settings.dmImage || "Not set", inline: true }
        );
      await interaction.reply({ embeds: [configEmbed] });
      break;
  }
});

client.login(config.TOKEN);

// ⭐ CREDITS: AZARESW | GITHUB: https://github.com/azaresw/Welcome-bot-djs-v14
// ⭐ DISCORD: https://dsc.gg/azeydev | SUPPORT, UPDATES, CUSTOM BOTS 
