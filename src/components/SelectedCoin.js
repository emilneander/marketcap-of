import React, { useState } from "react";
//component
import InfoBox from "./InfoBox";
//styles
import "../styles/SelectedCoin.css";
import { calculatePrice, calculatePercentage } from "../calculatePrice";
//formatter
import { formatPrice, formatMultiplier } from "../formatter";
//icons
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//functions
import { vibrate } from "../vibrate";

const SelectedCoin = ({ selectACoin, selectBCoin, selectCurrency }) => {
  const [openCard, setOpenCard] = useState(false);

  const price = calculatePrice(selectACoin, selectBCoin);
  // const percentage = calculatePercentage(price, selectACoin.current_price);
  const multiplicative = price / selectACoin.current_price;
  const a = selectACoin;
  const b = selectBCoin;

  //formating high number to e.g "k", "m"
  let o = Intl.NumberFormat("en", { notation: "compact" });

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
    <div className="selectedCoin-container-parent">
      {/* Only write out when there is a valid coin in both a and b */}
      {Object.keys(a).length && Object.keys(b).length ? (
        <div
          className="selectedCoins-container noSelect"
          onClick={() => {
            setOpenCard(!openCard);
            vibrate(10);
          }}
        >
          <p className="card-desc">
            {a.symbol.toUpperCase()} with the market cap of{" "}
            {b.symbol.toUpperCase()}
          </p>
          <div className="img-price">
            <img className="a-img" src={a.image} alt="crypto a" />
            <h1 className={"coin-prices " + symbolClass}>
              {selectCurrency.symbol}
            </h1>
            <h1 className="coin-prices">
              {/* Show only 2 decimals if price is over 0.1 */}
              {formatPrice(price)}
            </h1>
            <span
              className={
                multiplicative >= 1 ? "percent positive" : "percent negative"
              }
            >
              ({formatMultiplier(multiplicative)}
              <span className="percent span-multiply">x</span>)
            </span>
          </div>
          {/* here is the grid of market caps */}
          {openCard ? (
            <div className="text-div">
              <h2 className="market-cap-title">
                Market cap
                {/* <InfoBox selectACoin={selectACoin} /> */}
              </h2>
              {/* <h2 className="first-text">{a.symbol.toUpperCase()}: </h2> */}
              <div className="firstafter-text first-text">
                <h2 className={symbolClass + " grid-symbol"}>
                  {selectCurrency.symbol}
                </h2>
                <h2>{a.market_cap.toLocaleString()}</h2>
              </div>
              {/* <h2 className="second-text">{b.symbol.toUpperCase()}: </h2> */}
              <div className="firstafter-text second-text">
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
          ) : (
            ""
          )}
          {!openCard ? (
            <FontAwesomeIcon className="fa-chevron-down" icon={faChevronDown} />
          ) : (
            ""
          )}
          <p className="url-text">marketcapof.com</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectedCoin;
