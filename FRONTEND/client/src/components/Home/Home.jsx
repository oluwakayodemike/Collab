import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import NavBar from "../NavBar/NavBar";
import ImageSlider from "../ImageSlider/Slider";
import slideOne from "../../assets/Homepage/Whiteboarding.svg";
import slideTwo from "../../assets/Homepage/link-sharing.svg";
import slideThree from "../../assets/Homepage/privacy.svg";
import Popup from "../Popup/Popup";
import { getUserName } from "../../libs/getUserName";
import JoinPopup from "../Popup/JoinPopup";

const images = [slideOne, slideTwo, slideThree];

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showJoinPopup, setShowJoinPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const JoinPopupClose = () => {
    setShowJoinPopup(false);
  };

  let userName;
  try {
    userName = getUserName();
  } catch (error) {
    userName = null;
  }


  // check userName to verify `isloggedin` and store for fallback after signin
  const handleCreateMeetingClick = () => {
    if (userName === null) {
      localStorage.setItem("comebackUrl", window.location.pathname);
      navigate("/sign-in");
    } else {
      setShowPopup(true);
    }
  };

  // clean fallback url
  useEffect(() => {
    const comebackUrl = localStorage.getItem("comebackUrl");
    if (comebackUrl) {
      localStorage.removeItem("comebackUrl");
      navigate(comebackUrl);
    }
  }, []);

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
              <button className="btn btn-success" onClick={handleCreateMeetingClick}>
                Create Meeting
              </button>
              <button className="btn btn-primary mr-2" onClick={() => setShowJoinPopup(true)}>Join Meeting</button>
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
