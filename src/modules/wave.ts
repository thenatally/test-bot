import { defineEvent } from "strife.js";

defineEvent("messageCreate", async (message) => {
  console.log("Received message:", message.content);
  if (message.author.bot) return;
  if (message.mentions.has(message.client.user!)) {
    await message.react("👋");
  }
});

console.log("👋 wave module loaded");