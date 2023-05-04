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
    } ${data.last_name} \nTotal Summ: ${data.totalPrice} MDL \nTel:${
      data.phone
    }`;

    const bot = new TelegramBot(tgToken, { polling: true });
    await bot.sendMessage(chatId, message);
  } catch (e) {
    console.log(e);
  }
};
