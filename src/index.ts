import { fileURLToPath } from "node:url";
import { GatewayIntentBits } from "discord.js";
import { client, login } from "strife.js";
import pkg from "../package.json" assert { type: "json" };
import http from "node:http";

await login({
  handleError: (err) => {
    console.error("❌ An error occurred:", err);
  },
  clientOptions: {
    intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMembers | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
  },
  modulesDirectory: fileURLToPath(new URL("./modules", import.meta.url)),
});

const testChannel = await client.channels.fetch("1370955405076987964");

if (testChannel?.isSendable()) {
  await testChannel.send(`started bot version ${pkg.version} with github release ${pkg.gitRelease}`);
}

http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}).listen(3000, () => {
  console.log("HTTP server listening on port 3000");
});