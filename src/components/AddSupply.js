import React, { useState, useEffect } from "react";
//styles
import "../styles/AddSupply.css";
//addSupplyToData
import { addSupplyToData } from "../addPropsToData";

const AddSupply = ({
  setCoinNoSupply,
  coinNoSupply,
  selectACoin,
  selectBCoin,
  setSelectACoin,
  setSelectBCoin,
  setSupplyAvailable,
  coinNoSupplyOnHold,
  setCoinNoSupplyOnHold,
  inputRefSupply,
}) => {
  const [supply, setSupply] = useState("");
  //formating high number to e.g "k", "m"
  let o = Intl.NumberFormat("en", { notation: "compact" });
  const totalSupply = o.format(coinNoSupply.total_supply);

  //handlers
  const handleChange = (e) => {
    const { value, maxLength } = e.target;
    const newValue = value.slice(0, maxLength);
    setSupply(newValue);
  };
  const handleClick = () => {
    setSupply(coinNoSupply.total_supply);
  };

  //apply new supply
  const applySupply = (e) => {
    e.preventDefault();
    if (selectACoin === coinNoSupply) {
      const coinWithSupply = addSupplyToData(coinNoSupply, supply);
      setSelectACoin(coinWithSupply);
      if (Object.keys(coinNoSupplyOnHold).length) {
        setCoinNoSupply(coinNoSupplyOnHold);
        setCoinNoSupplyOnHold({});
        inputRefSupply.current.focus();
      } else {
        setSupplyAvailable(true);
        setCoinNoSupply({});
      }
    }
    if (selectBCoin === coinNoSupply) {
      const coinWithSupply = addSupplyToData(coinNoSupply, supply);
      setSelectBCoin(coinWithSupply);
      if (Object.keys(coinNoSupplyOnHold).length) {
        setCoinNoSupply(coinNoSupplyOnHold);
        setCoinNoSupplyOnHold({});
        inputRefSupply.current.focus();
      } else {
        setSupplyAvailable(true);
        setCoinNoSupply({});
      }
    }
    setSupply("");
  };

  return (
    <div className="add-supply-container">
      <div className="add-supply-box">
        <div className="supply-text-div">
          <p className="supply-text">
            The circulating supply for {coinNoSupply.symbol.toUpperCase()} is
            not verified.
          </p>
        </div>
        <form className="supply-input-container" onSubmit={applySupply}>
          <label className="supply-label" htmlFor="supply-input">
            Add the circulating supply manually
          </label>
          <div className="supply-input-div">
            {coinNoSupply.total_supply ? (
              <p className="supply-max-text" onClick={handleClick}>
                MAX
              </p>
            ) : (
              ""
            )}
            <input
              ref={inputRefSupply}
              required
              className={
                supply.length >= 22
                  ? "supply-input input-smaller"
                  : "supply-input"
              }
              id="supply-input"
              type="number"
              placeholder="0"
              value={supply}
              onChange={handleChange}
              min="1"
              max={coinNoSupply.total_supply ? coinNoSupply.total_supply : ""}
              maxLength="26"
              autoFocus
            />
          </div>
          {coinNoSupply.total_supply ? (
            <p className="under-supply-input">total supply: {totalSupply}</p>
          ) : (
            ""
          )}
          <button type="submit" className="btn ledger-btn supply-btn">
            <p className="ledger-btn-text supply-apply-text">Apply</p>
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddSupply;
