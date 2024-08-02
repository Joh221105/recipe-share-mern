import React from "react";
import "./About.css";

const About = () => {
  return (
    <div id="about-main-container">
      <h2 id="about-heading">What is Recipe Circle?</h2>
      <div id="about-column-container">
        <div className="about-column">Our Mission</div>
        <div className="about-column">Create</div>
        <div className="about-column">Share and Connect</div>
      </div>
    </div>
  );
};

export default About;
