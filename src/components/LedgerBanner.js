import React, { useState } from "react";
import "../styles/LedgerBanner.css";
//img
import LedgerLogo from "../img/Ledger-logo.png";
import LedgerStartedPack from "../img/ledger-starter-pack.png";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import {
  faMinusSquare,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";

const LedgerBanner = () => {
  //show/hide
  const [show, setShow] = useState(true);

  //handler
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div className="ledger-container">
      <FontAwesomeIcon
        className="faMinusSquare noSelect"
        icon={show ? faMinusSquare : faPlusSquare}
        onClick={handleClick}
      />
      {show ? (
        <a
          href="https://shop.ledger.com/products/crypto-starter-pack?r=b22d433db482"
          target="_blank"
          rel="nofollow"
        >
          <div className="ledger-banner">
            <img className="ledger-logo" src={LedgerLogo} alt="ledger-logo" />
            <h1 className="ledger-title">Be smart, secure your assets</h1>
            <p className="ledger-description">
              and get a <span className="voucher-span">$25</span> voucher for
              you to buy your favorite crypto!
            </p>
            <button className="btn ledger-btn">
              <p className="ledger-btn-text">Shop now</p>
              <FontAwesomeIcon
                className="faLongArrowAltRight"
                icon={faLongArrowAltRight}
              />
            </button>
            <img
              className="ledger-starter-pack"
              src={LedgerStartedPack}
              alt="ledger-starter-pack"
            />
          </div>
        </a>
      ) : (
        ""
      )}
    </div>
  );
};
export default LedgerBanner;
