import React from "react";
import "./About.css";

const About = () => {
  return (
    <div id="about-main-container">
      <h2 id="about-heading">What is Recipe Circle?</h2>
      <div id="about-column-container">
        <div className="about-column">
          <h3>Our Mission</h3>
          <p>
            At Recipe Circle, our mission is to foster a vibrant community of
            food enthusiasts who share a passion for cooking and discovering new
            recipes. We aim to make home cooking more enjoyable and accessible
            by providing a platform where users can easily find and share their
            favorite dishes.
          </p>
        </div>
        <div className="about-column">
          <h3>Create</h3>
          <p>
            Unleash your culinary creativity with Recipe Circle! Whether you’re
            a seasoned chef or a home cook experimenting with new ingredients,
            our platform allows you to create and showcase your own recipes.
            Enjoy the process of developing new dishes and sharing them with a
            supportive community.
          </p>
        </div>
        <div className="about-column">
          <h3>Share and Connect</h3>
          <p>
            Recipe Circle is more than just a recipe repository; it's a space to
            connect with fellow food lovers. Share your recipes, exchange
            cooking tips, and engage with others who share your love for food.
            Join discussions, follow your favorite cooks, and become part of a
            global community of food enthusiasts.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
