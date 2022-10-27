const axios = require("axios");

async function fetch() {
  const tvl = (await axios.get('https://trade.marginx.io/agg-server/api/v1/publicRankingData')).data.data.tvl;
  return tvl.USDT;
}

module.exports = {
  fetch
}