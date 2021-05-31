import React from "react";
import "../styles/Coin.css";

const DonateCoin = ({ coin, setShowDropdown, setSelectCoin }) => {
  const handleClick = () => {
    if (coin) {
      setSelectCoin(coin);
      setShowDropdown(false);
    }
  };

  return Object.keys(coin).length ? (
    <div className="coin-container" onClick={handleClick}>
      <div className="coin-row selected-dropdown donation-coin selected-donation-coin">
        <div className="coin">
          <img
            src={coin.image}
            className={
              coin.image ? "coin-img img-visible" : "coin-img img-hidden"
            }
            alt="crypto"
          />
          <h1>{coin.name}</h1>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
export default DonateCoin;
