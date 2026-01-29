
// REQUESITOS PRA COMUNICAÇÃO COM A API DO DISCORD [CLIENTE REST E O CAMINHO DA BIBLIOTECA DO DISCORD].
const { REST, Routes } = require("discord.js")

// AQUI É AONDE É FEITO O ACESSO A ALGUNS DADOS, PELOS QUAIS NÃO DEVEM SER EXPOSTOS E QUE SÃO IMPORTANTES [SEGURANÇA DO BOT].
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

// IMPORTAÇÃO DE TODOS OS COMANDOS CRIADOS PARA O BOT DO DISCORD
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// AONDE OS COMANDOS TÃO SENDO IMPORTADOS.
const commands = []

// AQ A IMPORTAÇÃO TAMBÉM ACONTECE, MAS TUDO É CONVERTIDO EM FORMATO JSON, QUE É O FORMATO ACEITO PELA API DO DISCORD.
for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

// INSTÂNCIA REST, PADRÃO DE COMUNICAÇÃO VIA PROTOCOLO HTTP, QUE DEIXA O BOT CONVERSA COM A API DO DISCORD.
// A VERSÃO INDICA QUAL VERSÃO ESSA API USA. [API é um conjunto de regras e padrões que dizem como você pode usar certos códigos pra fazer algo.].
const rest = new REST({ version: "10" }).setToken(TOKEN);

// DEPLOY DOS COMANDOS NO SERVIDOR DO DISCORD QUE O BOT ESTÁ.
(async () => {
    try{
        console.log(`Registering ${commands.length} commands...`)
        // PUT
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
        console.log("Commands Registered with success")
    }
    catch (error){
        console.error(error)
    }
})()