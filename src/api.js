import axios from "axios";

export const getDefaultCoins = (currency) => {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
    )
    .then((response) => {
      return response;
    });
};

export const apiStableCoinsId = () => {
  return axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
    .then((response) => {
      const data = response.data;
      const id = data.map((coin) => {
        return coin.id;
      });
      return id;
    });
};

export const getCoinAndMarketById = (id, currency) => {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`
    )
    .then((res) => {
      return [res.data].map((item) => {
        const tickers = [...item.tickers];
        const identifiers = tickers.map((obj) => {
          return obj.market.identifier;
        });
        //to match with property key
        const currencyLower = currency.toLowerCase();

        return {
          id: item.id,
          name: item.name,
          image: item.image.thumb,
          market_cap: item.market_data.market_cap[currencyLower],
          current_price: item.market_data.current_price[currencyLower],
          circulating_supply: item.market_data.circulating_supply,
          symbol: item.symbol,
          exhange: identifiers,
        };
      });
    })
    .catch((error) => console.log(error));
};

export const GetCoinTickerById = (id) => {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};

export const getCoinById = (id, currency) => {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};

export const getExtendedCoins = () => {
  console.log("loading");
  return axios
    .get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};
