import React from "react";
//route for Donation page
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
//components
import BuyCoinButton from "../components/BuyCoinButton";
import iconHand from "../img/hand.svg";
//pages
import Donation from "../pages/Donation";
import "../styles/Footer.css";
//icons
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({
  selectACoin,
  setNr,
  nr,
  keyPress,
  setKeyPress,
  mouseMove,
  setMouseMove,
  donateCoins,
  selectDonationCoin,
  setSelectDonationCoin,
  coins,
}) => {
  return (
    <footer className="footer">
      <hr />
      <div className="social-icon-row">
        <ul className="social-icons">
          <li>
            <a
              className="btn btn-twitter"
              href="https://twitter.com/MarketCapOf"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon className="fa twitter" icon={faTwitter} />
            </a>
          </li>
          <li>
            <BuyCoinButton selectACoin={selectACoin} coins={coins} />
          </li>

          <li>
            {/* Button to Donation page */}
            <Link to="/donation" className="link">
              <button className="btn btn-hand">
                {
                  //only write out image if coins exists
                  Object.keys(donateCoins).length ? (
                    <img
                      className="coin-over-hand opacity"
                      src={
                        // Bitcoin is set to default as supported coin
                        donateCoins.includes(selectACoin)
                          ? selectACoin.image
                          : donateCoins[0].image
                      }
                      alt="coin"
                    />
                  ) : (
                    ""
                  )
                }
                <img
                  className={
                    //only animate donate hand if coins exists
                    Object.keys(donateCoins).length
                      ? "fa icon-hand hand-anim"
                      : "fa icon-hand"
                  }
                  src={iconHand}
                  alt="hand"
                />
                <p className="donate-text">Donate</p>
              </button>
            </Link>
            <div className="ad-free-text">
              <FontAwesomeIcon
                className="faLongArrowAltLeft"
                icon={faLongArrowAltLeft}
              />
              <p>Keep me ad free</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="text-row">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} MarketCapOf. All Rights Reserved.
        </p>
      </div>
      <Route exact path="/donation">
        <Donation
          selectNr={nr}
          setSelectNr={setNr}
          keyPress={keyPress}
          setKeyPress={setKeyPress}
          mouseMove={mouseMove}
          setMouseMove={setMouseMove}
          selectACoin={selectACoin}
          donateCoins={donateCoins}
          selectDonationCoin={selectDonationCoin}
          setSelectDonationCoin={setSelectDonationCoin}
        />
      </Route>
    </footer>
  );
};
export default Footer;
