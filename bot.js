// discord 봇에 필요한 것들 가져옴
const { token, prefix } = require('./config.json');

const Client = require('./structures/client.js');

const queue = new Map();

// 새로운 클라이언트 생성 및 초기화
const client = new Client();

client.start(token);
// 클라이언트가 준비완료되면 콘솔에 표시
client.once('ready', () => {
  console.log('Ready!!');
})

client.on('messageCreate', async (message) => {

	if (!message.content.startsWith(prefix)) return;

	const args = message.content.substring(prefix.length).split(/ +/);

	const command = client.commands.find(cmd => cmd.name == args[0]);

	if(!command) return message.reply(`${args[0]} That is not a valid command!`);

	//const server_queue = queue.get(message.guild.id);

	command.run(message, args, client, queue);
})
