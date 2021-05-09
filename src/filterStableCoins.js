import { apiStableCoinsId } from "./api";

const filterStableCoins = (data) => {
  //quickfix to get away the stable coins that aren't tagged as one
  const firstFilteredData = data.filter((coin) => {
    return (
      !coin.name.toString().toLowerCase().includes("usd") &&
      !coin.symbol.toString().toLowerCase().includes("usd")
    );
  });
  //go deeper and remove all that is officially stable coins
  return apiStableCoinsId().then((stableId) => {
    const filteredData = firstFilteredData.filter((coin) => {
      return !stableId.some((id) => {
        return id === coin.id;
      });
    });
    return filteredData;
  });
};
export default filterStableCoins;
