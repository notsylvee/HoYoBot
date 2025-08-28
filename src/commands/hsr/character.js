const { EmbedBuilder } = require("discord.js");
const fs = require("fs/promises");

module.exports = {
    data: {
        name: "hsr-character",
        description: "Get a random Honkai: Star Rail character",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {

      const charactersJsonData = await fs.readFile("data/characters.json", {encoding: "utf8"});
      const charactersMap = JSON.parse(charactersJsonData);
      const characters = charactersMap["hsr"];
      const character = characters[Math.floor(Math.random() * characters.length)];
    
      let filetype = "png";
      if (character.num.startsWith("63")) filetype === "gif";

      const embed = new EmbedBuilder()
      .setColor(`#667dfa`)
      .setTitle(`${character.name}`)
      .setThumbnail(`https://cdn.sylvee.xyz/hsrcharacter${character.num}.${filetype}`)

      await interaction.reply({ embeds: [embed] });
    },
};