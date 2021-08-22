import React from "react";
//styles
import "../styles/Swap.css";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
//func
import { vibrate } from "../vibrate";

const Swap = ({ setSelectACoin, setSelectBCoin, selectACoin, selectBCoin }) => {
  const handleClick = () => {
    if (Object.keys(selectACoin).length || Object.keys(selectBCoin).length) {
      setSelectACoin(selectBCoin);
      setSelectBCoin(selectACoin);
      vibrate(10);
    }
  };
  return (
    <div
      className={
        selectACoin &&
        selectBCoin &&
        Object.keys(selectACoin).length &&
        Object.keys(selectBCoin).length
          ? "swap s-selected"
          : "swap"
      }
    >
      <FontAwesomeIcon
        className={
          selectACoin &&
          selectBCoin &&
          Object.keys(selectACoin).length &&
          Object.keys(selectBCoin).length
            ? "icon faExchangeAlt i-selected"
            : "icon faExchangeAlt"
        }
        icon={faExchangeAlt}
        onClick={handleClick}
      />
    </div>
  );
};

export default Swap;
