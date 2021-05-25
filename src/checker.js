export const canDonateTo = (data) => {
  data.filter((coin) => {
    return coin.donation.active === true;
  });
};
