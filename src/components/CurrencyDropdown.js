import React, { useState, useEffect } from "react";
import "../styles/CurrencyDropdown.css";
//component
import Currency from "./Currency";

const CurrencyDropdown = ({
  currencies,
  setShowCurrencyDropDown,
  setSelectCurrency,
}) => {
  //state for saving input
  const [search, setSearch] = useState("");

  //filter currency to what the current search value is
  const filteredCurrency = currencies.filter((currency) => {
    if (
      currency.name
        .toString()
        .toLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      currency.code
        .toString()
        .toLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      currency.symbol
        .toString()
        .toLowerCase()
        .includes(search.toLocaleLowerCase())
    )
      return currency;
  });

  //handlers
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="currency-dropdown">
      <form className="currency-form" onSubmit={handleSubmit}>
        <input
          className="search-currency"
          type="text"
          placeholder="e.g EUR"
          autoComplete="off"
          spellCheck="false"
          value={search}
          onChange={handleChange}
          autoFocus
        />
      </form>
      {filteredCurrency.map((currency, index) => {
        return (
          <Currency
            currency={currency}
            name={currency.name}
            code={currency.code}
            symbol={currency.symbol}
            position={currency.position}
            icon={currency.icon}
            index={index}
            key={currency.code}
            setSelectCurrency={setSelectCurrency}
            setShowCurrencyDropDown={setShowCurrencyDropDown}
          />
        );
      })}
    </div>
  );
};
export default CurrencyDropdown;
