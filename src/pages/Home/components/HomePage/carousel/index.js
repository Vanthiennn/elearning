import React from "react";
import "./style.scss"
export default function Carousel() {
  const scrollDown = () => {
    window.scroll({
      top:625,
      left:0,
      behavior:"smooth"
    })
  }
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
          <div className="form-group">
            <div className="search d-flex">
              <input
                type="text"
                placeholder="What course are you looking for?"
                className="form-control"
              ></input>
              <div className="content-search"></div>
              <button className="buttonPink">SEARCH</button>
            </div>
          </div>
        </div>
      </div>
      <div className="arrow-down" onClick={scrollDown}>
        <span></span>
        <span></span> 
        <span></span>  
      </div>
    </section>
  );
}
