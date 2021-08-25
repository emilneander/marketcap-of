import React from "react";
//style
import "../styles/ToggleButton.css";
//icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ToggleButton = ({
  text1,
  text2,
  toggleState,
  setToggleState,
  classText,
  icon1,
  icon2,
}) => {
  const clickHandler = () => {
    setToggleState(!toggleState);
    console.log(toggleState);
  };
  return (
    <div>
      <div
        className={classText + " toggle-container noSelect"}
        onClick={clickHandler}
      >
        <div
          className={toggleState ? "toggle toggle-true" : "toggle toggle-false"}
        />
        <span
          className={
            toggleState
              ? "toggle-left-span toggle-left-true"
              : "toggle-left-span"
          }
        >
          {text1 ? text1 : <FontAwesomeIcon icon={icon1} />}
        </span>
        <span
          className={
            toggleState
              ? "toggle-right-span toggle-right-true"
              : "toggle-right-span"
          }
        >
          {text2 ? text2 : <FontAwesomeIcon icon={icon2} />}
        </span>
      </div>
    </div>
  );
};
export default ToggleButton;
