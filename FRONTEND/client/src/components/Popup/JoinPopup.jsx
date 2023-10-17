import React from "react";
import { getUserName } from "../../libs/getUserName"
import "./Popup.css";

const JoinPopup = ({ onClose }) => {

  const JoinPopupClose = () => {
    onClose();
  };
  const userName = getUserName();

  return (
    <>
      <div className="popup-container">
        <div className="popup">
          <button className="close-button" onClick={JoinPopupClose}>
            &times;
          </button>
          <h3>Welcome, {userName}!</h3>
        </div>
      </div>
    </>
  );
};

export default JoinPopup;
