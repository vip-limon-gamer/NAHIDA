const axios = require("axios"); const fs = require("fs-extra"); const request = require("request"); const moment = require("moment-timezone"); 

module.exports.config = { name: "botinfo", version: "1.0.1", hasPermssion: 0, credits: "𝐑𝐊 :- http://github.com/cyber-ullash/CYBER-BOT-COMMUNITY", description: "📄 Bot info.", commandCategory: "system", cooldowns: 1, dependencies: { request: "", "fs-extra": "", axios: "" } }; 

module.exports.run = async function({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) { const timeStart = Date.now(); 

const gifLinks = [ "https://i.imgur.com/SqfKKE7.gif", "https://i.imgur.com/m7n3jAr.gif" ]; 

const uptimeSeconds = process.uptime(); const hours = Math.floor(uptimeSeconds / 3600); const minutes = Math.floor((uptimeSeconds % 3600) / 60); const seconds = Math.floor(uptimeSeconds % 60); 

const currentTime = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』【HH:mm:ss】"); 

const message = "🕧\n\n" + " 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍𝐒\n" + "───────╮\n" + " 🌸𝙋𝙍𝙀𝙁𝙄𝙓🌸 »»\n" + ☄️𝘽𝙊𝙏𝙉𝘼𝙈𝙀☄️ »» ${global.config.BOTNAME}\n + " 🥳𝙈𝙀🥳\n\n" + " 𝑫𝑨𝑻𝑬 𝑨𝑵𝑫 𝑻𝑰𝑴𝑬 \n" + ${currentTime}🕛\n + ⏰ 𝙐𝙋𝙏𝙄𝙈𝙀 ⚡: ${hours}:${minutes}:${seconds}\n + "╰──────•◈•──────╯\n" + "✿✦ 𝗡𝗔𝗛𝗜𝗗𝗔 ✦✿  | ʟʀ ʟɪᴍᴏɴ\n"; 

const selectedGif = gifLinks[Math.floor(Math.random() * gifLinks.length)]; const filePath = __dirname + "/cache/wa1.jpg"; 

const download = (uri, filename, callback) => { request(uri).pipe(fs.createWriteStream(filename)).on("close", callback); }; 

const sendMessage = () => { api.sendMessage( { body: message, attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath) ); }; 

download(encodeURI(selectedGif), filePath, sendMessage); };
