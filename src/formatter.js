export const formatPrice = (price) => {
  if (price > 1 && price < 1000) {
    price = price.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  } else if (price < 1) {
    price = price.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
  } else if (price > 1000) {
    price = price.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  return price;
};

export const formatMultiplier = (nr) => {
  if (nr > 100) {
    nr = nr.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  } else {
    nr = nr.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  return nr;
};
