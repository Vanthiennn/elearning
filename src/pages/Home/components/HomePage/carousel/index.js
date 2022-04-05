import React from "react";
import "./style.scss"
export default function Carousel() {
  
  return (
    <section className="mainCarousel">
      <div className="overlay"></div>
      <div className="imageCarousel"></div>
      <div className="contentCarousel ">
        <div>
          <h3 className="title-content">
            Getting started with <b>Cybersoft - Elearning</b>
          </h3>
          <p className="subtitle-content mb-5">
            We pride ourselves on providing the most up-to-date content for
            <br />
            our students to learn each course
          </p>
        </div>
      </div>
      <div className="arrow-down">
       <a href="#category"></a>
        <span></span>
        <span></span> 
        <span></span>  
      </div>
    </section>
  );
}
