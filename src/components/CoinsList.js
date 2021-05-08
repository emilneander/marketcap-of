import React, { useEffect, useRef } from "react";
import Coin from "./Coin";
import "../styles/CoinsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";

const CoinsList = ({
  search,
  coins,
  setSelectCoin,
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
}) => {
  //filter coins to what the current search value is

  const filteredCoins = coins.filter((coin) => {
    if (
      coin.name.toString().toLowerCase().includes(search.toLocaleLowerCase()) ||
      coin.symbol.toString().toLowerCase().includes(search.toLocaleLowerCase())
    )
      return coin;
  });

  //useeffects
  //set filtered coins when input is changed
  useEffect(() => {
    setFilteredCoins(filteredCoins);
  }, [search]);
  useEffect(() => {
    setFilteredCoins(filteredCoins);
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
    //go to last coin in list - 1 because first is 0 and last is 249
    //setNr(filteredCoins.length - 1);
    //to refresh and scroll to it
    //  setKeyPress(true);
  };

  return (
    <div className={"coins-container " + donationList} ref={refCurrentCoin}>
      {/* if we get any coins we start to map them out (therefore "coins.length ?") */}
      {coins.length ? (
        filteredCoins.map((coin, index) => {
          if (index < 250) {
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
              />
            );
          }
        })
      ) : (
        //else
        <p>Loading...</p>
      )}
      {/* extending search - only show when not extended yet*/}
      {!extendSearch && showExtend ? (
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
      {/* The sticky down arrows */}
      <div className="icon-div" onMouseDown={handleMouseDown}>
        <FontAwesomeIcon className="down" icon={faAngleDoubleDown} />
      </div>
    </div>
  );
};

export default CoinsList;
