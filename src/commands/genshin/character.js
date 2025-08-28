const { EmbedBuilder } = require("discord.js");
const fs = require("fs/promises");

module.exports = {
    data: {
        name: "gi-character",
        description: "Get a random Genshin Impact character",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    async execute(interaction) {

      const charactersJsonData = await fs.readFile("data/characters.json", {encoding: "utf8"});
      const charactersMap = JSON.parse(charactersJsonData);
      const characters = charactersMap["genshin"];
      const character = characters[Math.floor(Math.random() * characters.length)];

      const embed = new EmbedBuilder()
      .setColor(`#667dfa`)
      .setTitle(`${character.name}`)
      .setImage(`https://cdn.sylvee.xyz/genshincharacter${character.num}.png`)

      await interaction.reply({ embeds: [embed] });
    },
};