import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { actDetailCourse } from "store/detailCourse/actions";
import { addToCart as actAddToCarting } from "store/cart/actions"
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
import SuggestCourse from "../../../../components/SuggestCourse";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import "./style.scss";

export default function DetailCourse(props) {
  const [state, setState] = useState({
    fee: "",
  });
  const detailCourse = useSelector(
    (state) => state.detailCourseReducer.detailCourse
  );
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const addToCart = (item) => {
    dispatch(actAddToCarting(item))
  }

  const renderAddToCart = (items) => {
    return cartItems.findIndex((item) => {
      return  item.maKhoaHoc === items.maKhoaHoc    ;
    }) === -1 ? (
      <button className="add-cart" onClick={() => {
        addToCart(items)
      }}>
        Add To Cart
      </button>
    ) : (
      <NavLink className="add-cart go-cart" to={`/my-cart?${state.fee}`}>
        Go To Cart
      </NavLink>
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const { maKhoaHoc } = props.match.params;
    const { search } = props.location;
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
          <NavLink to="/">Home </NavLink>{" "}
          <span className="text-muted"> / </span> 
          <NavLink to={`/detail/${detailCourse.maKhoaHoc}?`}>
            {" "}
            Detail Course
          </NavLink>
        </div>
      </div>
      <div className="content mx-5 pt-4">
        <div className="row mb-5">
          <div className="col-sm-12 col-lg-8">
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
                  {renderAddToCart(detailCourse)}
                  </div>
                </div>
              </div>
              <div className="image-detail-course">
                <img src={detailCourse.hinhAnh} alt="" />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 mt-3">
            <div className="detail-right">
              <h3 className="text-center mb-5">Info Course</h3>
              <ul>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faReact} />{" "}
                  Course name: <span>{detailCourse.tenKhoaHoc}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faList} />{" "}
                  Category name:{" "}
                  <span>{detailCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faFlag} />{" "}
                  Description: <span>{detailCourse.moTa}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faClock} />{" "}
                  Date: <span>{detailCourse.ngayTao}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faEye} />{" "}
                  Watch: <span>{detailCourse.luotXem}</span>
                </li>
                <li>
                  <FontAwesomeIcon
                    className="icon-detail"
                    icon={faGraduationCap}
                  />{" "}
                  Student: <span> {detailCourse.soLuongHocVien}</span>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-detail" icon={faDollar} />{" "}
                  Fee: <span> {state.fee}</span>
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
