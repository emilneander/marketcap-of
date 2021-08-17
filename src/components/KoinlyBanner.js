import React, { useState } from "react";
import "../styles/KoinlyBanner.css";
//img
import KoinlyLargest from "../img/ad/koinly-largest.svg";
import KoinlyLarge from "../img/ad/koinly-large.svg";
import KoinlySmall from "../img/ad/koinly-small.svg";
import KoinlySmaller from "../img/ad/koinly-smaller.svg";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";

const KoinlyBanner = () => {
  //show/hide
  const [show, setShow] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <div className="svg-ad-div">
      {show ? (
        <a
          href="https://koinly.io/?via=0394B8B7"
          target="_blank"
          rel="nofollow noopener"
          aria-label="Koinly"
        >
          <div>
            <FontAwesomeIcon
              className="faMinusSquare noSelect faMinusSquare-koinly"
              icon={faMinusSquare}
              onClick={handleClick}
            />
            {/* <img className="svg-ad-img" src={KoinlyLargest} alt="koinly-largest" /> */}
            <picture>
              <source media="(min-width: 1180px)" srcSet={KoinlyLargest} />
              <source media="(min-width: 1030px)" srcSet={KoinlyLarge} />
              <source media="(min-width: 370px)" srcSet={KoinlySmall} />
              <source media="(min-width: 0px)" srcSet={KoinlySmaller} />
              <img className="svg-ad-img" src={KoinlyLargest} alt="koinly" />
            </picture>
          </div>
        </a>
      ) : (
        ""
      )}
    </div>
  );
};
export default KoinlyBanner;
