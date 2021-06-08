import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
//ticker api
import { GetCoinTickerById } from "../api";
//page
import BuyCoin from "../pages/BuyCoin";
//styles
import "../styles/BuyCoin.css";

const BuyCoinButton = ({ selectACoin }) => {
  //To see if Exhange is available
  const [exchangeAvailable, setExchangeAvailable] = useState(false);
  //to have current referral link
  const [markets, setMarkets] = useState([]);
  //when removing a coin there should still be shown the last selected
  const [lastCoin, setLastCoin] = useState({});
  //adding exchange info
  useEffect(() => {
    if (Object.keys(selectACoin).length) {
      GetCoinTickerById(selectACoin.id).then((result) => {
        const tickers = [...result.tickers];
        const identifiers = tickers.map((obj) => {
          return obj.market.identifier;
        });
        setMarkets(identifiers);
        //could use case instead later
        if (identifiers.includes("binance" || "kraken")) {
          setLastCoin(selectACoin);
          setExchangeAvailable(true);
        } else {
          setExchangeAvailable(false);
        }
      });
    }
    //if selectACoin does not exist
    else if (Object.keys(!selectACoin).length) {
      setExchangeAvailable(false);
    }
  }, [selectACoin]);
  return (
    <div>
      {exchangeAvailable ? (
        <Link to="/buy-coin" className="link">
          <button className="btn btn-buy">
            <p className="buy-text">Buy {lastCoin.symbol.toUpperCase()}</p>
          </button>
        </Link>
      ) : (
        ""
      )}
      <Route exact path="/buy-coin">
        <BuyCoin markets={markets} coinName={lastCoin.symbol} />
      </Route>
    </div>
  );
};
export default BuyCoinButton;
