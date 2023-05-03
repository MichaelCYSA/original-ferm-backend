const http = require("request");
const config = require("../../config.json");

module.exports = (data) => {
  const message = `
    NEW ORDER !
    Addess: ${data.city} ${data.distict} ${data.street} ${data.house} ${data.apratment}
    Name: ${data.first_name} ${data.last_name}
    Total Summ: ${data.totalPrice}
    `;
  const msg = encodeURI(message);

  http.post(
    `https://api.telegram.org/bot${config.TELEGRAM_KEY}/sendMessage?chat_id=${config.TELEGRAM_CHAT_ID}&parse_mode=html&text=${msg}`,
    function (error, response, body) {
      if (response.statusCode === 200) {
      }
      if (response.statusCode !== 200) {
      }
    }
  );
};
