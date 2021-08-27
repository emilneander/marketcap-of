import React, { useEffect } from "react";
//components
import CurrencySelector from "./CurrencySelector";
import ToggleButton from "./ToggleButton";
//icons
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const HamburgerMenu = ({
  setSelectCurrency,
  selectCurrency,
  selectACoin,
  setSelectACoin,
  selectBCoin,
  setSelectBCoin,
  usePercent,
  setUsePercent,
  vibrateState,
  setVibrateState,
  themeState,
  setThemeState,
}) => {
  return (
    <div className="hamburger-menu-container">
      <div className="hamburger-menu-item-container">
        <div className="hamburger-menu-item">
          <h1>Currency</h1>
          <CurrencySelector
            setSelectCurrency={setSelectCurrency}
            selectCurrency={selectCurrency}
            selectACoin={selectACoin}
            setSelectACoin={setSelectACoin}
            selectBCoin={selectBCoin}
            setSelectBCoin={setSelectBCoin}
            cookieName="currency"
          />
        </div>
        <div className="hamburger-menu-item">
          <h1>Price changes</h1>
          <ToggleButton
            text1="%"
            text2="X"
            classText="priceChanges-span"
            toggleState={usePercent}
            setToggleState={setUsePercent}
            cookieName="priceChange"
          />
        </div>
        <div className="hamburger-menu-item">
          <h1>Theme</h1>
          <ToggleButton
            classText="priceChanges-span theme-span"
            toggleState={themeState}
            setToggleState={setThemeState}
            icon1={faSun}
            icon2={faMoon}
            cookieName="theme"
          />
        </div>
        <div className="hamburger-menu-item">
          <h1>Vibration</h1>
          <ToggleButton
            text1="OFF"
            text2="ON"
            classText="vibration-span"
            toggleState={vibrateState}
            setToggleState={setVibrateState}
            cookieName="vibrate"
          />
        </div>
      </div>
    </div>
  );
};
export default HamburgerMenu;
