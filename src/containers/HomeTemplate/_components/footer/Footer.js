import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {  faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="footer text-center">
      <div className=" mb-5">
        <NavLink to="/">
          <img src="/img/logo.png" alt="/img/logo.png" className="text-center" />
        </NavLink>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 item-footer mt-3">
            <ul className="content-footer">
              <h3>INTRODUCE</h3>
              <li>
                <span>About Us</span>
              </li>
              <li>
                <span>Terms of Use</span>
              </li>
              <li>
                <span>Operating Regulation</span>
              </li>
              <li>
                <span>Privacy Policy</span>
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-4 item-footer mt-3">
            <ul className="content-footer">
              <h3>SOCIAL NETWORK</h3>
              <FontAwesomeIcon icon={faFacebook} className="icon-social" />
              <FontAwesomeIcon icon={faGithub} className="icon-social"/>
              <FontAwesomeIcon icon={faYoutube} className="icon-social"/>
            </ul>
          </div>
          <div className="col-sm-12 col-md-4 item-footer mt-3">
            <ul className="content-footer">
              <h3>CONTACT</h3>
              <li>
                <span>vanthien2k14@gmail.com</span>
              </li>
              <li>
                <span>https://github.com/Vanthiennn/elearning</span>
              </li>
              <h3 className="mt-5">PARTNER</h3>
              <li>
                <span>vuvivan11@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-5 footer-bottom">
          This project was created by Van Thien and Dinh Quan <br />
          Thank you for taking the time to check out our project. <br />
          Have a nice day !{" "}
          <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />{" "}
          <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />{" "}
          <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
        </div>
      </div>
    </div>
  );
}
