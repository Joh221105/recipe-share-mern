import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css"; // Custom CSS for styling
import Ann from "../../../images/ann.jpg";
import Eggs from "../../../images/eggs.jpg";
import Pbj from "../../../images/pbj.jpg";

const CarouselComponent = () => {
  return (
    <div className="carousel-wrapper">
      <Carousel
        width="100%"
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={5000}
        centerMode
        centerSlidePercentage={50}
      >
        <div>
          <img src={Ann} alt="1" />
        </div>
        <div>
          <img src={Eggs} alt="2" />
        </div>
        <div>
          <img src={Pbj} alt="3" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
