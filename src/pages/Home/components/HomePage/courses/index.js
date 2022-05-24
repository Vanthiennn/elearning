import React, { useEffect, useState } from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { actListCoursesApi } from "store/listCourses/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import { addToCart as actAddToCarting } from "store/cart/actions";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

export default function Courses(props) {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const infoUser = useSelector((state) => state.profileUserReducer.infoUser);
  const [isHeartActive, setHeartActive] = useState(false);
  const listCourses = useSelector(
    (state) => state.listCoursesReducer.listCourses
  );

  // set state để hiển thị ra 3 item trước khi click button Show more
  const [showMore, setShowMore] = useState({
    listCourses: [...listCourses],
    itemsToShow: 3,
    expanded: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actListCoursesApi());
  }, []);

  const addToCart = (item) => {
    dispatch(actAddToCarting(item));
  };

  const renderAddToCart = (items) => {
    return cartItems.findIndex((item) => {
      return item.maKhoaHoc === items.maKhoaHoc;
    }) === -1 ? (
      <button
        className="add-cart"
        onClick={() => {
          addToCart(items);
        }}
      >
        Add To Cart
      </button>
    ) : (
      <NavLink className="add-cart go-cart" to="/my-cart">
        Go To Cart
      </NavLink>
    );
  };
  const handleAddToCart = (items) => {
    return infoUser.chiTietKhoaHocGhiDanh ? 
    infoUser.chiTietKhoaHocGhiDanh?.findIndex((item) => {
      return item.maKhoaHoc === items.maKhoaHoc;
    }) === -1 ? (
      renderAddToCart(items)
    ) : (
      <NavLink className="add-cart go-profile" to="/profile">
        Go to profile
      </NavLink>
    ) : renderAddToCart(items)
  };

  const renderListCourses = () => {
    return listCourses.slice(0, showMore.itemsToShow).map((item, index) => {
      return (
        <div className="item-course col-sm-12   col-lg-4 mt-5 " key={index}>
          <div className="wallpaper">
            <img src={item?.hinhAnh} alt={item?.hinhAnh} />
            <div className="overlay"></div>
            <div className="name-courses">
              <h4>{item.tenKhoaHoc}</h4>
              <p>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
            </div>
          </div>
          <div className="main-content">
            <div className="relative">
              <div className="status-courses">
                <span>New</span>
              </div>
              <div className="info-courses d-flex justify-content-around ">
                <div className="teacher">
                  <img
                    src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                    alt="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                    style={{ width: 25, height: 25 }}
                  />
                  <label>Teacher</label>
                  <p>{item.nguoiTao.hoTen}</p>
                </div>
                <div className="student">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <label>Student</label>
                  <p>{item.soLuongHocVien}</p>
                </div>
                <div className="d-flex fee">${item.fee}</div>
              </div>
            </div>
            <div className="show-info">
              <p>Date: {item.ngayTao}</p>
              <h4>{item.tenKhoaHoc}</h4>
              <p>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
              <div className="d-flex pr-3">
                <div className="d-flex align-items-center justify-content-between w-100 ">
                  <div className="teacher">
                    <img
                      src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                      alt="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                      style={{ width: 25, height: 25 }}
                    />
                    <label>Teacher</label>
                    <p className="text-center">{item.nguoiTao.hoTen}</p>
                  </div>
                  <div className="d-flex fee">${item.fee}</div>
                </div>
              </div>
              <span>
                <FontAwesomeIcon icon={faEye} />
                {item.luotXem} | <FontAwesomeIcon icon={faGraduationCap} />
                {item.soLuongHocVien} | <FontAwesomeIcon icon={faHeart} /> 99{" "}
              </span>
              <p
                className="description mt-3"
                style={{
                  width: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.moTa}
              </p>
              <div className="button-show-info">
                <NavLink
                  className="detail"
                  to={`/detail/${item.maKhoaHoc}?${item.fee}`}
                >
                  Detail
                </NavLink>
                {handleAddToCart(item)}
                <div
                  className={isHeartActive ? "heart is-active" : "heart "}
                  onClick={() => {
                    setHeartActive(!isHeartActive);
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="list-courses text-center"
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <h3 className="title-courses">Our Top Courses</h3>
      <span style={{ color: "#b6b6b6" }}>
        Join over 100 instructors who use Teachable to share their knowledge
        Easily register for an online course
      </span>
      <div className="content-courses">
        <div className="item-courses container  ">
          <div className="row">{renderListCourses()}</div>
        </div>
        <div className="button-courses mt-5">
          <button
            className="buttonBlue d-inline-block mr-3"
            id="loadMore"
            onClick={() => {
              showMore.itemsToShow === 3
                ? setShowMore({ itemsToShow: 6, expanded: true })
                : setShowMore({ itemsToShow: 3, expanded: false });
            }}
          >
            {showMore.expanded ? (
              <span>SHOW LESS</span>
            ) : (
              <span>SHOW MORE</span>
            )}
          </button>
          <button className="buttonPink d-inline-block">
            <NavLink to="/courses/all" className="text-white">
              SHOW ALL
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}
