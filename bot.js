// discord 봇에 필요한 것들 가져옴
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// 새로운 클라이언트 생성 및 초기화
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// 클라이언트가 준비완료되면 콘솔에 표시
client.once('ready', () => {
  console.log('Ready!!');
})

// 
client.login(token);