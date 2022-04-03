import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { actDetailCourse } from "./modules/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faList,
  faFlag,
  faClock,
  faEye,
  faDollar,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import SuggestCourse from "../SuggestCourse/suggestCourse";
import { faReact } from "@fortawesome/free-brands-svg-icons";


export default function DetailCourse(props) {
  const [state, setState] = useState({
    fee: "",
  });
  const detailCourse = useSelector(
    (state) => state.detailCourseReducer.detailCourse
  );
  // console.log(listCourses))

  const dispatch = useDispatch();
  useEffect(() => {
    let { maKhoaHoc } = props.match.params;
    let { search } = props.location;
    setState({
      fee: search.slice(1, search.length),
    });
    dispatch(actDetailCourse(maKhoaHoc));
  }, []);
  return (
    <div className="py-5 detail-course">
      <div className="background-detail">
        <div className="overlay"></div>
        <div className="image-detail"></div>
        <div className="title-detail">
          <h3 className="text-white">{detailCourse.tenKhoaHoc}</h3>
          <NavLink to="/">Home /</NavLink>
          <NavLink to={`/detail/${detailCourse.maKhoaHoc}?`}>
            {" "}
            Detail Course
          </NavLink>
        </div>
      </div>
      <div className="content mx-5 pt-4">
        <div className="row mb-5">
          <div className="col-sm-12 col-md-8">
            <div className="name-course">
              {detailCourse.tenKhoaHoc}
              <span> {state.fee}$</span>
            </div>
            <div className="info-detail">
              <div className="row ">
                <div className="col-3">
                  <div className="item-content teacher-info">
                    <img
                      className="teacher-image"
                      src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                      alt=""
                    />
                    <div className="teacher-content">
                      Teacher
                      <p>{detailCourse?.nguoiTao?.hoTen}</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="item-content">
                    <div className="content">
                      Category
                      <p>{detailCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="item-content">
                    <div className="content">
                      Rate
                      <span>
                        {" "}
                        5{" "}
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: "yellow" }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="item-content">
                    <div className="content">
                      <button className="buttonBlue">Add to cart </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-detail-course">
                <img src={detailCourse.hinhAnh} alt="" />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="detail-right">
              <h3 className="text-center">
                Info Course
                
              </h3>
              <ul>
                <li>
                <FontAwesomeIcon className="icon-detail" icon={faReact} />  Course name: <span>{detailCourse.tenKhoaHoc}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faList} /> Category name:{" "}
                  <span>{detailCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faFlag} /> Description:{" "}
                  <span>{detailCourse.moTa}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faClock} /> Date:{" "}
                  <span>{detailCourse.ngayTao}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faEye} /> Watch:{" "}
                  <span>{detailCourse.luotXem}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faGraduationCap} /> Student:{" "}
                  <span> {detailCourse.soLuongHocVien}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faDollar} /> Fee:{" "}
                  <span> {state.fee}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <SuggestCourse />
      </div>
    </div>
  );
}
