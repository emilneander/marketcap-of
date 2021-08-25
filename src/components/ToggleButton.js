import React from "react";
//style
import "../styles/ToggleButton.css";

const ToggleButton = ({
  text1,
  text2,
  toggleState,
  setToggleState,
  classText,
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
          {text1}
        </span>
        <span
          className={
            toggleState
              ? "toggle-right-span toggle-right-true"
              : "toggle-right-span"
          }
        >
          {text2}
        </span>
      </div>
    </div>
  );
};
export default ToggleButton;
