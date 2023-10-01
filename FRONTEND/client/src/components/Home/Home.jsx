import React, { useState, useEffect } from 'react';
import './Home.css'

import SlideOne from "../../assets/Homepage/Whiteboarding.svg";

const Home = () => {
    return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <h1 className='text-start'>
                Transform ideas into <br />action on our dynamic <br /> online whiteboard
              </h1>
              <p className='more-text'>
                Fuel creativity, brainstorm on ideas, and collaborate in real-time as a team using our revolutionary virtual collaboration space.
              </p>
              <div className="d-flex">
                <button className="btn btn-primary mr-2">Join Meeting</button>
                <button className="btn btn-success">Create Meeting</button>
              </div>
            </div>
            <div className="col-md-6 description-text">
                <div className="circle-container">
                    <img src={SlideOne} alt="Circle Image" className="rounded-circle"/>
                </div>
                <div className="text-container">
                    <p>This is some text under the image.</p>
                </div>
            </div>
          </div>
        </div>
    );
};

export default Home