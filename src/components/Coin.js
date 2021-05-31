import React from "react";
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
  extendSearch,
  selectCurrency,
  setSupplyAvailable,
  supplyAvailable,
  setCoinNoSupply,
  setCoinNoSupplyOnHold,
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
          if (result && result[0].current_price !== null) {
            setSearch("");
            setDisplay(false);
            setSelectCoin(result[0]);
            //if supply is 0
            if (result[0].circulating_supply === 0) {
              //if there already is an object with no supply, put it on hold
              if (!supplyAvailable) {
                setCoinNoSupplyOnHold(result[0]);
              } else {
                setCoinNoSupply(result[0]);
                setSupplyAvailable(false);
              }
            }
          } else {
            alert(
              "Sorry, the price of " +
                result[0].name +
                " is not verified. Tag me on Twitter and tell me what coin!"
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
            ? "coin-row selected-dropdown"
            : "coin-row"
        }
      >
        <div className="coin">
          <img
            src={image}
            className={image ? "coin-img img-visible" : "coin-img img-hidden"}
            alt="crypto"
          />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default Coin;
