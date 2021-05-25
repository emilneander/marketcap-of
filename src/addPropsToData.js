//supported coins JS
import supportedCoins from "./donation/supported-coins";
import coinsWithImg from "./coins.json";

export const addDonationToData = (data) => {
  const newData = data.map((coin) => {
    coin["donation"] = {
      active: false,
      address: "",
      qr: "",
    };
    const dataAdded = supportedCoins.map((s) => {
      if (s.name === coin.name) {
        coin.donation.active = true;
        coin.donation.address = s.address;
        coin.donation.qr = s.qraddress;
      }
      return;
    });
    return dataAdded;
  });
  return newData;
};
export const addExchangeToData = (data) => {
  const newData = data.map((coin) => {
    coin["exchange"] = [];
  });
  return newData;
};

export const addImgToData = (data) => {
  const newData = data.map((coin) => {
    coinsWithImg.map((coinImg) => {
      if (
        coinImg.id === coin.id ||
        coinImg.symbol === coin.symbol ||
        coinImg.name === coin.name
      ) {
        coin["image"] = coinImg.image;
        coin["rank"] = coinImg.rank;
      }
    });
    return coin;
  });
  const sortedData = newData.sort((a, b) => {
    return parseFloat(a.rank) - parseFloat(b.rank);
  });

  return sortedData;
};
export const addSupplyToData = (data, supply) => {
  data.circulating_supply = supply;
  data.market_cap = supply * data.current_price;
  return data;
};
