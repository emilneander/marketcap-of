import React from "react";
//component
import InfoBox from "./InfoBox";
//styles
import "../styles/SelectedCoin.css";
import { calculatePrice, calculatePercentage } from "../calculatePrice";
import Currency from "./Currency";

const SelectedCoin = ({ selectACoin, selectBCoin, selectCurrency }) => {
  const price = calculatePrice(selectACoin, selectBCoin);
  const percentage = calculatePercentage(price, selectACoin.current_price);
  const a = selectACoin;
  const b = selectBCoin;

  //get classaname for the currency symbol to position it correctly
  let symbolClass = "coin-prices";
  let symbolClassGrid = "";
  if (selectCurrency.position === "after") {
    symbolClass = "after-symbol";
    symbolClassGrid = "grid-after";
    //more space if it is a letter base symbol
    if (/[a-zA-Z]/.test(selectCurrency.symbol)) {
      symbolClass = "after-symbol letter-after";
      symbolClassGrid = "grid-after letter-after";
    }
  } else {
    symbolClass = "before-symbol";
    symbolClassGrid = "grid-before";
    if (/[a-zA-Z]/.test(selectCurrency.symbol)) {
      symbolClass = "before-symbol letter-before";
      symbolClassGrid = "grid-before letter-before";
    }
  }
  return (
    <div
      className="selectedCoin-container-parent"
      // //change opacity when display is true
      // style={displayAList || displayBList ? { opacity: 0.25 } : { opacity: 1 }}
    >
      {/* Only write out when there is a valid coin in both a and b */}
      {Object.keys(a).length && Object.keys(b).length ? (
        //the actual selected coin to show "value" of
        <div className="selectedCoins-container">
          <div className="img-price">
            <img className="a-img" src={a.image} alt="crypto a" />
            <h1 className={"coin-prices " + symbolClass}>
              {selectCurrency.symbol}
            </h1>
            <h1 className="coin-prices">
              {/* Show only 2 decimals if price is over 0.1 */}
              {price > 1
                ? price.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })
                : price.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 8,
                  })}
            </h1>
            <span
              className={
                percentage >= 0 ? "percent positive" : "percent negative"
              }
            >
              ({percentage.toFixed(2)}%)
            </span>
          </div>
          {/* here is the grid of market caps */}
          <div className="text-div">
            <h2 className="market-cap-title">
              Market cap
              <InfoBox selectACoin={selectACoin} />
            </h2>
            {/* <h2 className="first-text">{a.symbol.toUpperCase()}: </h2> */}
            <div className="first-text">
              <h2 className={symbolClass + " grid-symbol"}>
                {selectCurrency.symbol}
              </h2>
              <h2>{a.market_cap.toLocaleString()}</h2>
            </div>
            {/* <h2 className="second-text">{b.symbol.toUpperCase()}: </h2> */}
            <div className="second-text">
              <h2 className={symbolClass + " grid-symbol"}>
                {selectCurrency.symbol}
              </h2>
              <h2>{b.market_cap.toLocaleString()}</h2>
            </div>
            <img //imgages to grid
              className="b-img first-text-img"
              src={a.image}
              alt="crypto b"
            />
            <img
              className="b-img second-text-img"
              src={b.image}
              alt="crypto a"
            />{" "}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectedCoin;
