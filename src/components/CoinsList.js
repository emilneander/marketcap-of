import React, { useState, useEffect, useRef } from "react";
import Coin from "./Coin";
import "../styles/CoinsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import { addImgToData } from "../addPropsToData";

const CoinsList = ({
  search,
  coins,
  setSelectCoin,
  selectCoin,
  setDisplay,
  display,
  setSearch,
  setFilteredCoins,
  setNr,
  nr,
  keyPress,
  mouseMove,
  setMouseMove,
  donationList,
  donationCoinStyle,
  selectedDonationCoinStyle,
  setExtendSearch,
  extendSearch,
  inputRef,
  showExtend,
  selectCurrency,
  filteredCoins,
  setSupplyAvailable,
  setCoinNoSupply,
}) => {
  const [coinsFound, setCoinsFound] = useState(true);
  //useeffects
  //set filtered coins when input is changed
  useEffect(() => {
    let searchResult = coins.filter((coin) => {
      if (
        coin.name
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        coin.symbol
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return coin;
      }
    });
    if (filteredCoins.length === 0 && extendSearch) {
      setCoinsFound(false);
    } else {
      setCoinsFound(true);
    }
    if (!extendSearch) {
      //filter coins to what the current search value is
      setFilteredCoins(searchResult);
    }
    if (extendSearch) {
      const newFiltered = searchResult.slice(0, 350);
      const imgFiltered = addImgToData(newFiltered);
      setFilteredCoins(imgFiltered);
    }
  }, [search]);

  //when changing coin fetch
  //set filtered coins and and also if there are any found
  useEffect(() => {
    //filter coins to what the current search value is
    let searchResult = coins.filter((coin) => {
      if (
        coin.name
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        coin.symbol
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return coin;
      }
    });
    if (filteredCoins.length === 0 && extendSearch) {
      setCoinsFound(false);
    } else {
      setCoinsFound(true);
    }
    if (!extendSearch) {
      setFilteredCoins(searchResult);
    }
    if (extendSearch) {
      const newFiltered = searchResult.slice(0, 350);
      const imgFiltered = addImgToData(newFiltered);
      setFilteredCoins(imgFiltered);
    }
  }, [coins]);

  //when keyPress is changed - scroll to html element selected
  useEffect(() => {
    //only try scroll if coins in list exists
    if (filteredCoins.length) {
      refCurrentCoin.current.childNodes[nr].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [keyPress]);

  //useEffect for fetching default coins (turn extendSearch to false)
  useEffect(() => {
    if (extendSearch) {
      setExtendSearch(false);
    }
  }, [display]);

  //ref for current coin in list
  const refCurrentCoin = useRef(null);

  //handlers
  const handleMouseDown = (e) => {
    //to not get focus on scroller
    e.preventDefault();
  };

  return (
    <div className={"coins-container " + donationList} ref={refCurrentCoin}>
      {/* if we get any coins we start to map them out (therefore "coins.length ?") */}
      {coins.length ? (
        filteredCoins.map((coin, index) => {
          if (index < 250 && index >= 0) {
            return (
              <Coin
                coins={coins}
                nr={nr}
                setNr={setNr}
                mouseMove={mouseMove}
                filteredCoins={filteredCoins}
                setSearch={setSearch}
                setSelectCoin={setSelectCoin}
                coinElement={coin}
                setDisplay={setDisplay}
                key={coin.id}
                name={coin.name.toString()}
                image={coin.image}
                symbol={coin.symbol.toString()}
                index={index}
                donationCoinStyle={donationCoinStyle}
                selectedDonationCoinStyle={selectedDonationCoinStyle}
                setExtendSearch={setExtendSearch}
                extendSearch={extendSearch}
                selectCurrency={selectCurrency}
                setSupplyAvailable={setSupplyAvailable}
                setCoinNoSupply={setCoinNoSupply}
              />
            );
          }
        })
      ) : (
        //else
        <p>Loading...</p>
      )}
      {/* extending search - only show when not extended yet*/}
      {!extendSearch && showExtend && Object.keys(coins).length ? (
        <div className="extend-search">
          <p>Can't find your coin?</p>
          <button
            onClick={() => {
              setMouseMove(false);
              setExtendSearch(true);
              setNr(0);
              inputRef.current.focus();
            }}
          >
            Extend search
            <FontAwesomeIcon className="fa-search" icon={faSearchPlus} />
          </button>
          <p className="delay-ptag">Might cause some delay...</p>
        </div>
      ) : (
        ""
      )}
      {!coinsFound ? (
        <div className="no-result">
          <p>
            Sorry, no result...
            <br /> Tag me on Twitter and I will try to add it
          </p>
        </div>
      ) : (
        ""
      )}
      {/* The sticky down arrows */}
      {coinsFound ? (
        <div className="icon-div" onMouseDown={handleMouseDown}>
          <FontAwesomeIcon className="down" icon={faAngleDoubleDown} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CoinsList;
