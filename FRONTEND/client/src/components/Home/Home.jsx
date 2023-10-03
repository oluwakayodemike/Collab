import ImageSlider from '../ImageSlider/Slider';
import './Home.css'
import NavBar from '../NavBar/NavBar';

import slideOne from "../../assets/Homepage/Whiteboarding.svg";
import slideTwo from "../../assets/Homepage/link-sharing.svg"
import slideThree from "../../assets/Homepage/privacy.svg"


const images = [
  slideOne,
  slideTwo,
  slideThree,
];

const Home = () => {
    return (
      <div className='home-container'>
        <NavBar />
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
                <button className="btn btn-success">Create Meeting</button>
                <button className="btn btn-primary mr-2">Join Meeting</button>

              </div>
            </div>
            <div className="col-md-6 description-text">
                <div className="circle-container">
                    {/* <img src={SlideOne} alt="circle image?" className="rounded-circle"/> */}
                    <ImageSlider images={images} className="rounded-circle" style={{ borderRadius: '50%', border: '2px solid red' }} />
                </div>
                <div className="text-container">
                    <p>Different Texts, should be attached to each images here...</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Home