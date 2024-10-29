import React from "react";

const About = () => {
  return (
    <div className="bg-background flex flex-col items-center justify-center h-[75vh]">
      <h2 className="text-4xl font-bold text-primary text-center p-5 rounded-lg">
        WHAT IS RECIPE CIRCLE?
      </h2>
      <div className="p-10 flex flex-col lg:flex-row w-full gap-8 items-stretch">
        <div className="bg-white flex-1 rounded-lg shadow-lg p-6 transition-transform transform hover:-translate-y-1 hover:shadow-2xl text-center mb-6 lg:mb-0">
          <h3 className="text-2xl font-semibold text-primary my-4">
            Our Mission
          </h3>
          <p className="text-text text-lg m-6 leading-relaxed">
            At Recipe Circle, our mission is to foster a vibrant community of
            food enthusiasts who share a passion for cooking and discovering
            new recipes. We aim to make home cooking more enjoyable and
            accessible by providing a platform where users can easily find and
            share their favorite dishes.
          </p>
        </div>
        <div className="bg-white flex-1 rounded-lg shadow-lg p-10 transition-transform transform hover:-translate-y-1 hover:shadow-2xl text-center mb-6 lg:mb-0">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Create
          </h3>
          <p className="text-text text-lg leading-relaxed m-6">
            Unleash your culinary creativity with Recipe Circle! Whether you’re
            a seasoned chef or a home cook experimenting with new ingredients,
            our platform allows you to create and showcase your own recipes.
          </p>
        </div>
        <div className="bg-white flex-1 rounded-lg shadow-lg p-10 transition-transform transform hover:-translate-y-1 hover:shadow-2xl text-center mb-6 lg:mb-0">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Share and Connect
          </h3>
          <p className="text-text text-lg leading-relaxed m-6">
            Recipe Circle is more than just a recipe repository; it's a space to
            connect with fellow food lovers. Share your recipes, exchange
            cooking tips, and engage with others who share your love for food.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
