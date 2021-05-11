import React, { useState, useRef } from "react";
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

//ref for input to be active when click

const CurrencySelector = ({ setSelectCurrency, selectCurrency }) => {
  //states
  const [showCurrencyDropDown, setShowCurrencyDropDown] = useState(false);

  //when clicking outside dropdown..
  const ref = useClickOutside(() => {
    setShowCurrencyDropDown(false);
  });

  //handles
  const handleClick = () => {
    setShowCurrencyDropDown(!showCurrencyDropDown);
  };

  return (
    <div className="currency-selector-container" ref={ref}>
      <button className="btn currency-opener" onClick={handleClick}>
        {selectCurrency.code}
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
