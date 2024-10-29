import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Salad from "../../images/salad.jpg";
import Eggs from "../../images/eggs.jpg";
import Pbj from "../../images/pbj.jpg";

const CarouselComponent = () => {
  return (
    <div className="h-[75vh] mx-auto rounded-lg shadow-lg overflow-hidden">
      <Carousel
        centerMode={true}
        centerSlidePercentage={75}
        dynamicHeight={false}
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={8000}
        transitionTime={1500}
        emulateTouch={true}
        swipeable={true}
        showStatus={false}
      >
        <div className="flex transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-white items-center justify-center">
          <img
            src={Salad}
            alt="salad"
            className=" mx-10 max-w-full h-[35rem] rounded-lg object-cover"
          />
        </div>
        <div className="flex transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-white items-center justify-center">
          <img
            src={Eggs}
            alt="Eggs"
            className="mx-10 max-w-full h-[35rem] rounded-lg object-cover"
          />
        </div>
        <div className="flex transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-white items-center justify-center">
          <img
            src={Pbj}
            alt="PBJ"
            className="mx-10 max-w-full h-[35rem] rounded-lg object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
