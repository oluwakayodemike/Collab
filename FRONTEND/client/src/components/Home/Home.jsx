import React, { useState } from "react";
import "./Home.css";
import NavBar from "../NavBar/NavBar";
import ImageSlider from "../ImageSlider/Slider";
import slideOne from "../../assets/Homepage/Whiteboarding.svg";
import slideTwo from "../../assets/Homepage/link-sharing.svg";
import slideThree from "../../assets/Homepage/privacy.svg";
import Popup from "../Popup/Popup";
import JoinPopup from "../Popup/JoinPopup";

const images = [slideOne, slideTwo, slideThree];

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);

  // handle PopupClose
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const JoinPopupClose = () => {
    setShowJoinPopup(false);
  };
  
  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-start">
              Transform ideas into <br /> action on our dynamic <br /> online
              whiteboard
            </h1>
            <p className="more-text">
              Fuel creativity, brainstorm on ideas, and collaborate in
              real-time as a team using our revolutionary virtual collaboration
              space.
            </p>
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => setShowPopup(true)}
              >
                Create Meeting
              </button>
              <button className="btn btn-primary mr-2" onClick={setShowJoinPopup}>Join Meeting</button>
            </div>
          </div>
          <div className="col-md-6 description-text">
            <div className="circle-container">
              <ImageSlider images={images} className="rounded-circle" />
            </div>
            <div className="text-container">
              <p>Just Descriptionssssssss</p>
            </div>
          </div>
          {showPopup && <Popup onClose={handlePopupClose} />}
          {showJoinPopup && <JoinPopup onClose={JoinPopupClose} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
