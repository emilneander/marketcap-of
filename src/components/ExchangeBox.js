import React from "react";
//icons
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExchangeBox = ({ name, logo, description, link }) => {
  return (
    <div className="box-exchange">
      <img src={logo} alt={name} className={"exchange-logo " + name} />
      <h3 className="exchange-description">{description}</h3>
      <a className="exchange-link" href={link} target="_blank" rel="nofollow">
        <button className="exchange-btn">
          Let's go!{" "}
          <FontAwesomeIcon
            className="faExternalLinkAlt"
            icon={faExternalLinkAlt}
          />
        </button>
      </a>
    </div>
  );
};
export default ExchangeBox;
