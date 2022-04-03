import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBookmark,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import "./style.scss"
export default function InfoElearning() {
  return (
    <div
      className="my-5 info-elearning"
      style={{ backgroundImage: 'url("img/bg-info-elearning.jpg")' }}
    >
      <div
        className="ie-overlay"
        style={{ backgroundImage: 'url("img/bg-2.png")' }}
      ></div>
      <div className="ie-content row">
        <div className="icon-group col-sm-12 col-md-4">
          <FontAwesomeIcon icon={faBookmark} className="icon" />
          <div className="name-icon">Teachers</div>
          <CountUp start={0} end={20} duration={5}>
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} className="count" />
              </VisibilitySensor>
            )}
          </CountUp>
        </div>
        <div className="icon-group col-sm-12 col-md-4">
          <FontAwesomeIcon icon={faBook} className="icon" />
          <div className="name-icon">Lessons</div>
          <CountUp start={0} end={65} duration={5}>
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} className="count" />
              </VisibilitySensor>
            )}
          </CountUp>
        </div>
        <div className="icon-group col-sm-12 col-md-4">
          <FontAwesomeIcon icon={faGraduationCap} className="icon" />
          <div className="name-icon">Student</div>
          <CountUp start={0} end={999} duration={5}>
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} className="count" />
              </VisibilitySensor>
            )}
          </CountUp>
        </div>
      </div>
    </div>
  );
}
