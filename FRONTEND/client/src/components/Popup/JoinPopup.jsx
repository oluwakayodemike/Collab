import React, { useState } from "react";
import { getUserName } from "../../libs/getUserName";
import { CgEnter } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "./Popup.css";

const JoinPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");
  const [userName, setUserName] = useState(getUserName());
  const [isNavigating, setIsNavigating] = useState(false);

  const JoinPopupClose = () => {
    onClose();
  };

  const handleEnterMeeting = () => {
    if (roomID.trim() === "") {
      alert("Please Enter meeting ID");
    } else {
      setIsNavigating(true);
      setTimeout(() => {
        navigate(`/${roomID}`);
      }, 3000);
    }
  };

  return (
    <>
      <div className="popup-container">
        <div className="popup">
          <button className="close-button" onClick={JoinPopupClose}>
            &times;
          </button>
          <div className="heading">Welcome, {userName}!</div>
          <div className="code-container">
            <input
              type="text"
              placeholder="Enter Meeting ID"
              className="input-code"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
            />
            {isNavigating ? (
              <div className="loading-spinner"></div>
            ) : (
              <button className="join" onClick={handleEnterMeeting}>
                {isNavigating ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <CgEnter style={{ fontSize: '20px', marginRight: '8px' }} />
                )}
                Join
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinPopup;
