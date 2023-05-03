const TelegramBot = require("node-telegram-bot-api");
const config = require("../../config.json");

module.exports = (data) => {
  const message = `NEW ORDER ! \nAddess: ${data.city} ${
    data.district ? data.district : ""
  } ${data.street} ${
    data.home ? `${data.home}${`${data.block ? `/${data.block}` : ""}`}` : ""
  } ${data.apartment ? `Ap-${data.apartment}` : ""} \nName: ${
    data.first_name
  } ${data.last_name} \nTotal Summ: ${data.totalPrice} MDL`;

  const bot = new TelegramBot(config.TELEGRAM_KEY, { polling: true });
  bot.sendMessage(config.TELEGRAM_CHAT_ID, message);
};
