import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss"
export default function People() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => {
      return (
        <a href="/">
          <img
            src={`img/people-${i + 1}.jpg`}
            alt={`img/people-${i + 1}.jpg`}
          />
        </a>
      );
    },
  };
  return (
    <div className="text-center people my-5">
      <h2>User Comments</h2>
      <Slider {...settings} className="text-center container">
        <div>
          <div className="content">
            <span>“</span> Less is more applies to eLearning too. More content,
            more flashy technology, and more ideas stuffed into a single
            presentation is a sure recipe for disaster. Instead of drowning
            students in a sea of content, why not keep stick to one idea and
            help them understand it deeply?. <span>“</span>
          </div>
        </div>
        <div>
          <div className="content">
            <span>“</span> Less is more applies to eLearning too. More content,
            more flashy technology, and more ideas stuffed into a single
            presentation is a sure recipe for disaster. Instead of drowning
            students in a sea of content, why not keep stick to one idea and
            help them understand it deeply?. <span>“</span>
          </div>
        </div>
        <div>
          <div className="content">
            <span>“</span> Less is more applies to eLearning too. More content,
            more flashy technology, and more ideas stuffed into a single
            presentation is a sure recipe for disaster. Instead of drowning
            students in a sea of content, why not keep stick to one idea and
            help them understand it deeply?. <span>“</span>
          </div>
        </div>
      </Slider>
    </div>
  );
}
