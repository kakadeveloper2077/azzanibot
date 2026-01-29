
// O COMMANDO SLASH QUE VEM DO DISCORD JS, O MODULE EXPORTS, PRA EXPORTA ESSES COMANDOS, OS DATA, SÃO ESSA NOVA INSTÂNCIA DESSE COMANDO SLASH "/",
// PORÉM AQ É SETADO, O NOME CO COMANDO, SUA DESCRIÇÃO E POR MEIO DO EXECUTE, A INTERAÇÃO VEM COM UMA RESPOSTA, POR EX: os personagens da azzani geek.
const { SlashCommandBuilder } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("personagens")
        .setDescription("Listar todos os personagens criados dentro da azzani geek"),

    async execute(interaction) {
        await interaction.reply(`| Sr Azzani(Giovanni) | Lina | Allie | Clesar | Cão Refresco | Dilon | Giovanno | Cecilia | Isadora`)
    }
}