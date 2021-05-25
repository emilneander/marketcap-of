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
  const applySupply = () => {
    if (selectACoin === coinNoSupply) {
      const coinWithSupply = addSupplyToData(coinNoSupply, supply);
      setSelectACoin(coinWithSupply);
      setSupplyAvailable(true);
      setCoinNoSupply({});
    }
    if (selectBCoin === coinNoSupply) {
      const coinWithSupply = addSupplyToData(coinNoSupply, supply);
      setSelectBCoin(coinWithSupply);
      setSupplyAvailable(true);
      setCoinNoSupply({});
    }
  };
  console.log(coinNoSupply);
  return (
    <div className="add-supply-container">
      <div className="add-supply-box">
        <div className="supply-text-div">
          <p className="supply-text">
            The circulating supply for {coinNoSupply.symbol.toUpperCase()} is
            not verified.
          </p>
        </div>
        <div className="supply-input-container">
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
              max={coinNoSupply.total_supply}
              maxLength="26"
            />
          </div>
          {coinNoSupply.total_supply ? (
            <p className="under-supply-input">total supply: {totalSupply}</p>
          ) : (
            ""
          )}
          <button className="btn ledger-btn supply-btn" onClick={applySupply}>
            <p className="ledger-btn-text">Apply</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddSupply;
