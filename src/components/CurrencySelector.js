import React, { useState, useEffect } from "react";
import "../styles/CurrencySelector.css";
import "../styles/Footer.css";
import "../styles/DropdownSelected.css";
//json file with currency data
import currencies from "../currencies.json";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
//components
import CurrencyDropdown from "./CurrencyDropdown";
//function
import useClickOutside from "../hooks/useClickOutside";
//api
import { getCoinById } from "../api";

//ref for input to be active when click

const CurrencySelector = ({
  setSelectCurrency,
  selectCurrency,
  selectACoin,
  selectBCoin,
  setSelectACoin,
  setSelectBCoin,
}) => {
  //states
  const [showCurrencyDropDown, setShowCurrencyDropDown] = useState(false);

  //useeffect for fetching coins when currency changed
  useEffect(() => {
    if (Object.keys(selectACoin).length) {
      getCoinById(selectACoin.id, selectCurrency.code).then((result) => {
        //if we get a result from fetch
        if (result) {
          setSelectACoin(result[0]);
        } else {
          setSelectACoin("");
        }
      });
    }
    if (Object.keys(selectBCoin).length) {
      getCoinById(selectBCoin.id, selectCurrency.code).then((result) => {
        //if we get a result from fetch
        if (result) {
          setSelectBCoin(result[0]);
        } else {
          setSelectBCoin("");
        }
      });
    }
  }, [selectCurrency]);

  //when clicking outside dropdown..
  const ref = useClickOutside(() => {
    setShowCurrencyDropDown(false);
  });

  //handles
  const handleClick = () => {
    setShowCurrencyDropDown(!showCurrencyDropDown);
  };

  return (
    <div className="currency-selector-container noSelect" ref={ref}>
      <button className="currency-opener" onClick={handleClick}>
        <p> {selectCurrency.code}</p>
        <FontAwesomeIcon
          className={showCurrencyDropDown ? "fa-down up" : "fa-down"}
          icon={faCaretDown}
        />
      </button>
      {showCurrencyDropDown ? (
        <CurrencyDropdown
          currencies={currencies}
          setShowCurrencyDropDown={setShowCurrencyDropDown}
          setSelectCurrency={setSelectCurrency}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default CurrencySelector;
