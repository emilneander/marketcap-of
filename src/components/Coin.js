import React, { useEffect } from "react";
import "../styles/Coin.css";
import { getCoinById } from "../api";

const Coin = ({
  coinElement,
  index,
  name,
  image,
  symbol,
  setSelectCoin,
  setDisplay,
  setSearch,
  nr,
  setNr,
  filteredCoins,
  mouseMove,
  donationCoinStyle,
  selectedDonationCoinStyle,
  extendSearch,
  selectCurrency,
}) => {
  //when clicking on a coin in the list
  const clickHandler = () => {
    //if coinElement is defined
    if (coinElement) {
      //if not extended search, do the default,
      if (!extendSearch) {
        setSelectCoin(coinElement);
        setSearch("");
        setDisplay(false);
        //else fetch specific coin
      } else if (extendSearch) {
        getCoinById(coinElement.id, selectCurrency.code).then((result) => {
          //if we get a result from fetch
          if (result) {
            setSelectCoin(result[0]);
            setSearch("");
            setDisplay(false);
          } else {
            alert(
              "Sorry " +
                coinElement.name +
                " got some issues loading from coingecko. Tag me on Twitter and tell me what coin, I will fix it within 24h"
            );
          }
        });
      }
    }
  };
  //to change position of dropdown selector
  const mouseOverHandler = () => {
    //only set nr if mouse is in use
    if (mouseMove === true) {
      setNr(index);
    }
    return;
  };
  return Object.keys(coinElement).length && coinElement && name ? (
    <div
      className="coin-container"
      onClick={clickHandler}
      onMouseOver={mouseOverHandler}
    >
      <div
        className={
          //to get the color on selected coin
          // if selected a donation coin, then hide the highligt when selected, and do hover instead
          name === filteredCoins[nr].name
            ? `coin-row selected-dropdown
              ${donationCoinStyle} ${selectedDonationCoinStyle}`
            : `coin-row ${donationCoinStyle}`
        }
      >
        <div className="coin">
          <img
            src={image}
            className={image ? "coin-img img-visible" : "coin-img img-hidden"}
            alt="crypto"
          />
          <h1>{name}</h1>
          {!donationCoinStyle ? <p className="coin-symbol">{symbol}</p> : ""}
          {/* <p className="coin-price">${price}</p> */}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default Coin;
