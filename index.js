
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')

// AQUI É AONDE É FEITO O ACESSO A ALGUNS DADOS, PELOS QUAIS NÃO DEVEM SER EXPOSTOS E QUE SÃO IMPORTANTES [SEGURANÇA DO BOT].
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

// IMPORTAÇÃO DE TODOS OS COMANDOS CRIADOS PARA O BOT DO DISCORD
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	if ("data" in command && "execute" in command){
		client.commands.set(command.data.name, command)
	}else {
		console.log(`File Command at ${filePath} with "data" or "execute" its empty `)
	}
}

// LOGIN PARA O BOT FICAR ONLINE NO SERVIDOR DO DISCORD
client.once(Events.ClientReady, (readyClient) => {
	if (readyClient) {
		return console.log(`Connection Established, BOT ONLINE! | [${readyClient.user.tag}]`)
	} else {
		return console.log(`Disconnected!, BOT OFFLINE!`)
	}
});
client.login(TOKEN);

// LISTENER DE INTERAÇÃO COM O BOT
client.on(Events.InteractionCreate, async interaction =>{
	if (!interaction.isChatInputCommand()) return
		const command = interaction.client.commands.get(interaction.commandName)
		if (!command) {
			console.error("Command not founded.")
			return
		}try {
			await command.execute(interaction)
		}catch (error){
			console.log(error)
			await interaction.reply("Fail at executing this command!")
		}
})