import React from "react";
import CarouselComponent from "../../common/components/Carousel";

const RecipeExample = () => {
  return (
    <div className="bg-primary py-10">
      <h2 className="p-5 text-4xl font-bold text-background text-center mb-10">
        Try These Today!
      </h2>
      <CarouselComponent />
    </div>
  );
};

export default RecipeExample;
