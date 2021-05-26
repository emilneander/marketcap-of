import React, { useRef, useEffect } from "react";
import SelectedCoinInSearch from "./SelectedCoinInSearch";
import "../styles/Search.css";
import { getCoinById } from "../api";
const Search = ({
  setSearch,
  search,
  searchName,
  setDisplay,
  display,
  placeholder,
  filteredCoins,
  setSelectCoin,
  selectCoin,
  nr,
  setNr,
  setKeyPress,
  setMouseMove,
  donationInput,
  inputRef,
  extendSearch,
  selectCurrency,
  setSupplyAvailable,
  supplyAvailable,
  setCoinNoSupply,
  coinNoSupply,
  setCoinNoSupplyOnHold,
  coinNoSupplyOnHold,
}) => {
  //handlers
  const handleChange = (e) => {
    setSearch(e.target.value);
    setDisplay(true);
    setNr(0);
  };
  const handleClick = () => {
    setDisplay(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(filteredCoins[nr]).length) {
      //if not extended search, do the default,
      if (!extendSearch) {
        setSelectCoin(filteredCoins[nr]);
        setSearch("");
        setDisplay(false);
        inputRef.current.blur();
        //else fetch specific coin
      } else if (extendSearch) {
        getCoinById(filteredCoins[nr].id, selectCurrency.code).then(
          (result) => {
            //if we get a result from fetch
            if (result) {
              setSearch("");
              setDisplay(false);
              inputRef.current.blur();
              setSelectCoin(result[0]);
              if (result[0].market_cap === 0) {
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
                "Sorry " +
                  filteredCoins[nr].name +
                  " got some issues loading from coingecko. Tag me on Twitter and tell me what coin, I will fix it within 24h"
              );
            }
          }
        );
      }
    }
  };
  //when input is blurred we set the selected drop down number to 0
  const handleBlur = () => {
    setNr(0);
  };
  //function for changing dropdown nr when pressing down or up key
  const handleKeyDown = (e) => {
    //for useEffect for scroll @CoinList
    setKeyPress(true);
    //for pointer not to integrate with list
    setMouseMove(false);
    switch (e.keyCode) {
      case 40: //down
        if (nr !== filteredCoins.length - 1) {
          setNr(nr + 1);
        }
        break;
      case 38: //up
        if (nr !== 0) {
          setNr(nr - 1);
        }
        break;
    }
  };
  const handleKeyUp = () => {
    setKeyPress(false);
  };
  //effects
  //if display is not shown and there is a selected coin. To not have some undefined written text under the Element in search
  useEffect(() => {
    if (!display && Object.keys(selectCoin).length) {
      setSearch("");
    }
  }, [display]);
  return (
    <div className="coin-search">
      <h1 className="coin-text">
        Select <span className={"span-" + searchName}>{searchName}</span>
      </h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className={"coin-input " + donationInput}
          type="text"
          value={search}
          onChange={handleChange}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          ref={inputRef}
          autoComplete="off"
          spellCheck="false"
          //show placeholder if there isnt a selected coin
          placeholder={Object.keys(selectCoin).length === 0 ? placeholder : ""}
        />
        {
          //only print out the component if there is a selected coin and display is not true
          Object.keys(selectCoin).length && !display ? (
            <div className="selected-coin-in-search-container">
              <SelectedCoinInSearch
                setSelectCoin={setSelectCoin}
                selectCoin={selectCoin}
                selectCurrency={selectCurrency}
                setCoinNoSupply={setCoinNoSupply}
                coinNoSupply={coinNoSupply}
                coinNoSupplyOnHold={coinNoSupplyOnHold}
                setCoinNoSupplyOnHold={setCoinNoSupplyOnHold}
                setSupplyAvailable={setSupplyAvailable}
              />
            </div>
          ) : (
            ""
          )
        }
      </form>
    </div>
  );
};

export default Search;
