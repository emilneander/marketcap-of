import React, { useState } from "react";
import "../styles/LedgerBanner.css";
//img
import LedgerLogo from "../img/Ledger-logo-white.png";
import LedgerStartedPack from "../img/ledger-starter-pack.png";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";

const LedgerBanner = () => {
  //show/hide
  const [show, setShow] = useState(true);

  //handler
  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <div className="ledger-container">
      {show ? (
        <a
          href="https://shop.ledger.com/products/crypto-starter-pack?r=b22d433db482"
          target="_blank"
          rel="nofollow"
        >
          <div className="ledger-banner">
            <FontAwesomeIcon
              className="faMinusSquare noSelect"
              icon={faMinusSquare}
              onClick={handleClick}
            />
            <img className="ledger-logo" src={LedgerLogo} alt="ledger-logo" />
            <h1 aria-hidden="true" className="ledger-title"></h1>
            <div className="ledger-desc-div">
              <p className="ledger-description desc-one" />
              <p className="voucher-span desc-two" />
              <p className="ledger-description desc-three" />
            </div>
            <button className="btn ledger-btn">
              <p className="ledger-btn-text">Read more</p>
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
