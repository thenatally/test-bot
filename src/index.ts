import { fileURLToPath } from "node:url";
import { GatewayIntentBits } from "discord.js";
import { client, login } from "strife.js";
import pkg from "../package.json" assert { type: "json" };

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
  await testChannel.send(`started bot version ${pkg.version}`);
}
