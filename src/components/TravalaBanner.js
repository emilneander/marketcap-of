import React, { useState } from "react";
import "../styles/LedgerBanner.css";
import "../styles/TravalaBanner.css";
//img
import TravalaLogo from "../img/travala-logo.png";
import PalmImage from "../img/palm-image.jpg";
import HouseWithPool from "../img/smaller-image.jpg";
import OnlyOcean from "../img/only-ocean-min.jpg";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";

const TravalaBanner = () => {
  //show/hide
  const [show, setShow] = useState(true);

  //handler
  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <div className="ledger-container travala-container">
      {show ? (
        <a
          href="https://www.travala.com?ref=marketcapof"
          target="_blank"
          rel="nofollow"
        >
          <div className="ledger-banner travala-banner">
            <FontAwesomeIcon
              className="faMinusSquare noSelect faMinusSquare-travala"
              icon={faMinusSquare}
              onClick={handleClick}
            />
            <div className="travala-title-div">
              <h2 className="travala-title trava-p trava1"></h2>
              <h2 className="travala-title trava-p trava2"></h2>
              <h2 className="travala-title trava3"></h2>
              <div className="save-up-to">
                <h2 className="travala-title trava4a"></h2>
                <h2 className="travala-title trava-p trava4b"></h2>
              </div>
            </div>
            <div className="image-with-button-travala">
              <img
                className="ledger-starter-pack palm-image"
                src={PalmImage}
                alt="palm-beach"
              />
              <img
                className="palm-image travala-smaller-image"
                src={HouseWithPool}
                alt="book-hotel"
              />
              <img
                className="palm-image only-ocean"
                src={OnlyOcean}
                alt="ocean"
              />
              <div className="travala-btn-logo">
                <img
                  className="travala-logo"
                  src={TravalaLogo}
                  alt="travala-logo"
                />

                <button className="btn ledger-btn travala-btn">
                  <p className="ledger-btn-text travala-btn-text">Book now</p>
                  <FontAwesomeIcon
                    className="faLongArrowAltRight"
                    icon={faLongArrowAltRight}
                  />
                </button>
              </div>
            </div>
          </div>
        </a>
      ) : (
        ""
      )}
    </div>
  );
};
export default TravalaBanner;
