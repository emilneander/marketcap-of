import React from "react";
import "../styles/SelectedCoinInSearch.css";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const SelectedCoinInSearch = ({
  selectCoin,
  setSelectCoin,
  selectCurrency,
  setCoinNoSupply,
  coinNoSupply,
  coinNoSupplyOnHold,
  setCoinNoSupplyOnHold,
  setSupplyAvailable,
}) => {
  //if clicked on the close icon
  const handleClick = () => {
    //to first remove if the supply needs a fix
    if (coinNoSupply === selectCoin) {
      if (Object.keys(coinNoSupplyOnHold).length) {
        setCoinNoSupply(coinNoSupplyOnHold);
        setCoinNoSupplyOnHold({});
      } else {
        setSupplyAvailable(true);
        setCoinNoSupply({});
      }
    } else if (coinNoSupplyOnHold === selectCoin) {
      setCoinNoSupplyOnHold({});
    }
    //remove the coin
    setSelectCoin({});
  };
  //classname for symbol
  let symbolClass = "price";
  if (selectCurrency.position === "after") {
    symbolClass = "price input-after-symbol";
    if (/[a-zA-Z]/.test(selectCurrency.symbol)) {
      symbolClass = "price input-after-symbol letters-after";
    }
  } else {
    symbolClass = "price input-before-symbol";
    if (/[a-zA-Z]/.test(selectCurrency.symbol)) {
      symbolClass = "price input-before-symbol letters-before";
    }
  }

  return (
    <div className="coin-in-search-container">
      <img src={selectCoin.image} alt="img-a" />
      <h4 className="symbol">{selectCoin.symbol.toUpperCase()}</h4>
      <h4 className={symbolClass}>{selectCurrency.symbol}</h4>
      {Object.keys(selectCoin).length ? (
        <h4 className="price">
          {selectCoin.current_price > 1
            ? selectCoin.current_price.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            : selectCoin.current_price.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 8,
              })}
        </h4>
      ) : (
        ""
      )}
      <FontAwesomeIcon
        className="fa-times"
        icon={faTimesCircle}
        onClick={handleClick}
      />
    </div>
  );
};
export default SelectedCoinInSearch;
