import React from "react";
import { useCookies } from "react-cookie";

const Currency = ({
  currency,
  name,
  code,
  setSelectCurrency,
  setShowCurrencyDropDown,
}) => {
  const [cookie, setCookie] = useCookies(["currency"]);

  //handlers
  const handleClick = () => {
    setCookie("currency", currency);
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
