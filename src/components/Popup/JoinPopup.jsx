import React, { useState } from "react";
import { getUserName } from "../../libs/getUserName";
import { CgEnter } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "./Popup.css";

const JoinPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");

  let userName;
  try {
    userName = getUserName();
  } catch (error) {
    userName = null;
  }
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
          {userName ? (
            <div className="heading">Welcome, {userName}!</div>
          ) : (
            <div className="heading">Welcome</div>
          )}
          {userName ? (
            <p className="description">Please, Input your Invite Code in the space below to Join Session</p>
          ) :(
            <p className="description">Sorry, but you have to sign with your invite code to Join Session </p>
          )}
          {userName ? (
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
          ) : (
            <div className="code-container">
              <button className="copy-button signin" onClick={() => navigate('/sign-in')}>
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JoinPopup;
