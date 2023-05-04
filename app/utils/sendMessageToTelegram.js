const TelegramBot = require("node-telegram-bot-api");
const config = require("../../config.json");

const chatId = process.env.TELEGRAM_CHAT_ID || config.TELEGRAM_CHAT_ID;
const tgToken = process.env.TELEGRAM_KEY || config.TELEGRAM_KEY;

module.exports = async (data) => {
  try {
    const message = `NEW ORDER ! \nAddess: ${data.city} ${
      data.district ? data.district : ""
    } ${data.street} ${
      data.home ? `${data.home}${`${data.block ? `/${data.block}` : ""}`}` : ""
    } ${data.apartment ? `Ap-${data.apartment}` : ""} \nName: ${
      data.first_name
    } ${data.last_name} \nTotal Summ: ${data.totalPrice} MDL`;

    const bot = new TelegramBot(tgToken, { polling: true });
    const res = await bot.sendMessage(chatId, message);
    return res
  } catch (e) {
    return JSON.stringify(e);
  }
};
