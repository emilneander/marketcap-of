import React from "react";

const Currency = ({
  currency,
  name,
  code,
  setSelectCurrency,
  setShowCurrencyDropDown,
}) => {
  //handlers
  const handleClick = () => {
    setSelectCurrency(currency);
    setShowCurrencyDropDown(false);
  };
  return (
    <div className="coin-container currency-container" onClick={handleClick}>
      <div className="coin-row currency-row">
        <p>{name}</p>
        <p className="currency-code">{code}</p>
      </div>
    </div>
  );
};
export default Currency;
