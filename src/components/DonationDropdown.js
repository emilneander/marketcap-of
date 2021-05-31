import React, { useState } from "react";
import "../styles/CoinsList.css";
//component
import DonateCoin from "../components/DonateCoin";

const DonationDropdown = ({
  filteredCoins,
  setShowDropdown,
  setSelectCoin,
}) => {
  return (
    <div className="coins-container donation-list">
      {filteredCoins
        ? filteredCoins.map((coin, index) => {
            return (
              <DonateCoin
                coin={coin}
                index={index}
                key={coin.id}
                setShowDropdown={setShowDropdown}
                setSelectCoin={setSelectCoin}
              />
            );
          })
        : ""}
    </div>
  );
};
export default DonationDropdown;
