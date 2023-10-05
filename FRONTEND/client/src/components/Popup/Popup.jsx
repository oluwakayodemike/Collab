import React, { useState } from "react";
import "./Popup.css";
import { FaClipboard } from "react-icons/fa";
import generateMeetingCode from "./GenerateCode/Code"; // Import the function with .jsx extension

const Popup = ({ onClose }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [meetingCode, setMeetingCode] = useState("");

  const handleClosePopup = () => {
    // Reset the meetingCode state and notify Home component when popup closes.
    setMeetingCode("");
    onClose();
  };

  // call meetingGen when popup opens
  if (meetingCode === "") {
    setMeetingCode(generateMeetingCode());
  }

  return (
    <>
      <div className="popup-container">
        <div className="popup">
          <h3 className="heading">Join the Session</h3>
          <p className="description">
            This is the room code for the Session. Share it with anyone you
            want to invite.
          </p>
          <div className="code-container">
            <h3 className="code">{meetingCode}</h3>
            <button className="copy-button" onClick={() => setCopySuccess(true)}>
              <FaClipboard />
              {copySuccess ? "Copied" : "Copy"}
            </button>
          </div>
          <button className="close-button" onClick={handleClosePopup}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
