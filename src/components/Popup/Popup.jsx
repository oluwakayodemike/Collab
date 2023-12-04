import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate  } from "react-router-dom";
import { FaClipboard } from "react-icons/fa";
import { CgEnter } from "react-icons/cg"
import generateMeetingCode from "./GenerateCode/Code";
import "./Popup.css";

const Popup = ({ onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [roomID, setMeetingCode] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleClosePopup = () => {
    // Reset the meetingCode state and notify Home component when popup closes.
    setMeetingCode("");
    onClose();
  };

  // call meetingGen when popup opens
  if ( roomID === "") {
    setMeetingCode(generateMeetingCode());
  }

  const handleEnterMeeting = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(`/${roomID}`);
    }, 3000);
  };

  return (
    <>
      <div className="popup-container">
        <div className="popup">
          <button className="close-button" onClick={handleClosePopup}>
            &times;
          </button>
          <h3 className="heading">Join the Session</h3>
          <p className="description">
            This is the room code for the Session. Share it with anyone you
            want to invite.
          </p>
          <div className="code-container">
            <h3 className="code">{roomID}</h3>
            <CopyToClipboard text={roomID} onCopy={() => setCopySuccess(true)}>
              <button className="copy-button">
                <FaClipboard />
                {copySuccess ? "Copied" : "Copy"}
              </button>
            </CopyToClipboard>
            {isNavigating ? (
              <div className="loading-spinner"></div>
            ) : (
              <button className="join" onClick={handleEnterMeeting}>
                <CgEnter style={{ fontSize: '20px', marginRight: '8px' }}/>
                Enter
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;