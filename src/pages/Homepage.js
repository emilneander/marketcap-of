import React, { useEffect, useState, useRef } from "react";
import { addDonationToData, addExchangeToData } from "../addPropsToData";
//fetch
import axios from "axios";
//api
import { getDefaultCoins } from "../api";
import CoinsList from "../components/CoinsList";
import Footer from "../components/Footer";
//logo
import mcoLogo from "../img/mco-logo.png";
//filter stablecoins
import filterStableCoins from "../filterStableCoins";
//coins from json
import unhandledCoins from "../coins.json";
//currencies from json
import currencies from "../currencies.json";
//components
import Search from "../components/Search";
import SelectedCoin from "../components/SelectedCoin";
import Swap from "../components/Swap";
import CurrencySelector from "../components/CurrencySelector";
//hooks
import useClickOutside from "../hooks/useClickOutside";
//style
import "../styles/Homepage.css";
//route link for logo
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

const Homepage = () => {
  // const [api, setApi] = useState(apiUrl);
  const [coins, setCoins] = useState([]);
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");
  const [displayAList, setDisplayAList] = useState(false);
  const [displayBList, setDisplayBList] = useState(false);
  const [filteredCoinsA, setFilteredCoinsA] = useState([]);
  const [filteredCoinsB, setFilteredCoinsB] = useState([]);
  const [selectNr, setSelectNr] = useState(0);
  const [selectACoin, setSelectACoin] = useState({});
  const [selectBCoin, setSelectBCoin] = useState({});
  const [keyPress, setKeyPress] = useState(false);
  const [mouseMove, setMouseMove] = useState(false);
  const [donateCoins, setDonateCoins] = useState([]);
  const [selectDonationCoin, setSelectDonationCoin] = useState({});
  const [extendSearch, setExtendSearch] = useState(false);
  const [selectCurrency, setSelectCurrency] = useState(currencies[0]);

  //fetch all coins
  useEffect(() => {
    // setTimeout(() => {
    getDefaultCoins(selectCurrency.code)
      .then((res) => {
        //add the donation info to the data
        addDonationToData(res.data);
        //add exchange props to data
        addExchangeToData(res.data);
        const data = res.data;
        //setting default coins if extendSearch is false
        if (!extendSearch) {
          //filter away stable coins and set coins if NOT extend search
          filterStableCoins(data).then((filteredData) => {
            setCoins(filteredData);
          });
          //setting extended coins if extendSearch is true
        } else if (extendSearch) {
          //filter away stable coins and set coins if extend search
          filterStableCoins(unhandledCoins).then((filteredData) => {
            setCoins(filteredData);
          });
        }
        //setting the donation coins
        const canDonateTo = res.data.filter((coin) => {
          return coin.donation.active === true;
        });
        setDonateCoins(canDonateTo);
        setSelectDonationCoin(canDonateTo[0]);
      })
      .catch((error) => console.log(error));
    // }, 4000);
  }, [extendSearch, selectCurrency]);

  //refs
  const aRef = useClickOutside(() => {
    setDisplayAList(false);
  });
  const bRef = useClickOutside(() => {
    setDisplayBList(false);
  });
  //ref for input search
  const inputRefA = useRef(null);
  const inputRefB = useRef(null);
  //handler
  const handleMouseMove = () => {
    setMouseMove(true);
  };

  return (
    <Router>
      <Route path="/">
        <div className="homepage-container">
          <div className="mco-div">
            <Link to="/" className="link">
              <div className="logo-title">
                <img className="mco-logo" src={mcoLogo} alt="logo" />
                <span>MarketCapOf</span>
              </div>
              <hr className="hr-under-logo" />
            </Link>
            <CurrencySelector
              setSelectCurrency={setSelectCurrency}
              selectCurrency={selectCurrency}
              selectACoin={selectACoin}
              setSelectACoin={setSelectACoin}
              selectBCoin={selectBCoin}
              setSelectBCoin={setSelectBCoin}
            />
          </div>
          <div className="homepage" onMouseMove={handleMouseMove}>
            <div className="title">
              <h1>
                Show the value of <span className="span-A">A</span> <br />
                with the market cap of
                <span className="span-B"> B</span>
              </h1>
            </div>
            <div className="search-list-container" ref={aRef}>
              {/* A - SEARCH/LIST */}
              <Search
                setSearch={setSearchA}
                search={searchA}
                searchName="A"
                setDisplay={setDisplayAList}
                display={displayAList}
                placeholder="e.g Ethereum"
                setSelectCoin={setSelectACoin}
                selectCoin={selectACoin}
                filteredCoins={filteredCoinsA}
                nr={selectNr}
                setNr={setSelectNr}
                setKeyPress={setKeyPress}
                setMouseMove={setMouseMove}
                inputRef={inputRefA}
                extendSearch={extendSearch}
                selectCurrency={selectCurrency}
              />
              {displayAList ? (
                <CoinsList
                  coins={coins}
                  search={searchA}
                  setSelectCoin={setSelectACoin}
                  selectCoin={selectACoin}
                  display={displayAList}
                  setDisplay={setDisplayAList}
                  setSearch={setSearchA}
                  setFilteredCoins={setFilteredCoinsA}
                  setNr={setSelectNr}
                  nr={selectNr}
                  keyPress={keyPress}
                  setKeyPress={setKeyPress}
                  mouseMove={mouseMove}
                  setExtendSearch={setExtendSearch}
                  extendSearch={extendSearch}
                  inputRef={inputRefA}
                  setMouseMove={setMouseMove}
                  showExtend={true}
                  selectCurrency={selectCurrency}
                />
              ) : (
                ""
              )}
            </div>

            <Swap
              setSelectACoin={setSelectACoin}
              setSelectBCoin={setSelectBCoin}
              selectACoin={selectACoin}
              selectBCoin={selectBCoin}
            />
            {/* B - SEARCH/LIST */}
            <div className="search-list-container" ref={bRef}>
              <Search
                setSearch={setSearchB}
                search={searchB}
                searchName="B"
                setDisplay={setDisplayBList}
                display={displayBList}
                placeholder="e.g Bitcoin"
                setSelectCoin={setSelectBCoin}
                selectCoin={selectBCoin}
                filteredCoins={filteredCoinsB}
                setNr={setSelectNr}
                nr={selectNr}
                setKeyPress={setKeyPress}
                setMouseMove={setMouseMove}
                inputRef={inputRefB}
                extendSearch={extendSearch}
                selectCurrency={selectCurrency}
              />
              {displayBList ? (
                <CoinsList
                  coins={coins}
                  search={searchB}
                  setSelectCoin={setSelectBCoin}
                  selectCoin={selectBCoin}
                  setDisplay={setDisplayBList}
                  display={displayBList}
                  setSearch={setSearchB}
                  setFilteredCoins={setFilteredCoinsB}
                  setNr={setSelectNr}
                  nr={selectNr}
                  keyPress={keyPress}
                  setKeyPress={setKeyPress}
                  mouseMove={mouseMove}
                  setExtendSearch={setExtendSearch}
                  extendSearch={extendSearch}
                  inputRef={inputRefB}
                  setMouseMove={setMouseMove}
                  showExtend={true}
                  selectCurrency={selectCurrency}
                />
              ) : (
                ""
              )}
            </div>
            <div className="selectedCoin-div">
              {Object.keys(selectACoin).length &&
              Object.keys(selectBCoin).length ? (
                <SelectedCoin
                  selectACoin={selectACoin}
                  selectBCoin={selectBCoin}
                  displayAList={displayAList}
                  displayBList={displayBList}
                  selectCurrency={selectCurrency}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <Footer
            className="footi"
            selectACoin={selectACoin}
            selectBCoin={selectBCoin}
            coins={coins}
            selectNr={selectNr}
            setSelectNr={setSelectNr}
            keyPress={keyPress}
            setKeyPress={setKeyPress}
            mouseMove={mouseMove}
            setMouseMove={setMouseMove}
            donateCoins={donateCoins}
            selectDonationCoin={selectDonationCoin}
            setSelectDonationCoin={setSelectDonationCoin}
          />
        </div>
      </Route>
    </Router>
  );
};
export default Homepage;
