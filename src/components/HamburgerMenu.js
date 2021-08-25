import React from "react";
//components
import CurrencySelector from "./CurrencySelector";
import ToggleButton from "./ToggleButton";

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
          />
        </div>
      </div>
    </div>
  );
};
export default HamburgerMenu;
