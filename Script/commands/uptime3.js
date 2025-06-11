const os = require("os");
const fs = require("fs-extra");
const { execSync } = require("child_process");
const prettyBytes = require("pretty-bytes");

const startTime = new Date();

module.exports.config = {
  name: "uptime",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "CYBER CHAT BOT TEAM (Optimized by ChatGPT)",
  description: "Shows full system info + runtime",
  commandCategory: "System",
  usages: "uptime",
  prefix: false,
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  try {
    const now = new Date();
    const uptimeMs = now - startTime;
    const uptimeSec = Math.floor(uptimeMs / 1000);
    const days = Math.floor(uptimeSec / 86400);
    const hours = Math.floor((uptimeSec % 86400) / 3600);
    const minutes = Math.floor((uptimeSec % 3600) / 60);
    const seconds = uptimeSec % 60;
    const runtime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Get Node.js version
    const nodeVersion = process.version;

    // CPU info
    const cpuModel = os.cpus()[0].model;
    const cpuCores = os.cpus().length;
    
    // More accurate CPU usage (simplified to avoid incorrect huge percentage)
    const load = os.loadavg()[0] / cpuCores * 100;
    const cpuUsage = load.toFixed(2) + "%";

    // RAM usage
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    const ramUsage = `${prettyBytes(usedMem)} / ${prettyBytes(totalMem)}`;

    // Storage usage (real disk usage)
    let storageUsage = "N/A";
    try {
      const df = execSync('df -h /').toString().split("\n")[1].split(/\s+/);
      storageUsage = `${df[2]} / ${df[1]}`;
    } catch (e) {}

    // Time and date (with timezone)
    const timezone = "Asia/Dhaka";
    const date = now.toLocaleDateString("en-US", { timeZone: timezone });
    const time = now.toLocaleTimeString("en-US", { timeZone: timezone, hour12: true });

    const pingStart = Date.now();
    await api.sendMessage("🔎| Checking system info...", event.threadID);
    const ping = Date.now() - pingStart;

    const msg = 
`♡   ∩_∩
 （„• ֊ •„)♡
╭─∪∪────────────⟡
│✿✦ 𝗡𝗔𝗛𝗜𝗗𝗔 ✦✿  | ʟʀ ʟɪᴍᴏɴ
├───────────────⟡
│ ⏰ 𝗥𝗨𝗡𝗧𝗜𝗠𝗘
│  ${runtime}
├───────────────⟡
│ 👑 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢
│ OS: ${os.type()} ${os.arch()}
│ LANG VER: ${nodeVersion}
│ CPU MODEL: ${cpuModel}
│ STORAGE: ${storageUsage}
│ CPU USAGE: ${cpuUsage}
│ RAM USAGE: ${ramUsage}
├───────────────⟡
│ ✅ 𝗢𝗧𝗛𝗘𝗥 𝗜𝗡𝗙𝗢
│ DATE: ${date}
│ TIME: ${time}
│ PING: ${ping}ms
│ STATUS: ✅| Smooth System
╰───────────────⟡`;

    await api.sendMessage({ body: msg }, event.threadID);
  } catch (err) {
    console.error("⛔ System Info Error:", err);
    api.sendMessage("⛔ System Info Error!", event.threadID);
  }
};
