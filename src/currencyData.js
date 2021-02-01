const axios = require('axios');

exports.currencyData = async function currencyData() {
  const request = await axios.get('https://economia.awesomeapi.com.br/json/all');
  const data = request.data;
  return data;
}