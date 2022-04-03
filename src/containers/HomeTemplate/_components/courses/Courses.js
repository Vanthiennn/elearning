import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actListCoursesApi } from "./modules/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { actAddToCart } from "containers/HomeTemplate/MyCart/module/actions";
AOS.init();

export default function Courses(props) {
  const listCart = useSelector((state) => state.listCartReducer.listCart);
  const [isHeartActive, setHeartActive] = useState(false);
  const listCourses = useSelector(
    (state) => state.listCoursesReducer.listCourses
  );
  // set state để hiển thị ra 3 item trước khi click button Show more
  const [showMore, setShowMore] = useState({
    listCourses: [...listCourses],
    itemsToShow: 5,
    expanded: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actListCoursesApi());
  }, []);

  const scrollUp = () => {
    window.scroll({
      top: 850,
      left: 0,
      behavior: "smooth",
    });
  };

  const addToCart = () => {
    localStorage.getItem("UserHome")
      ? dispatch(actAddToCart(listCart))
      : Swal.fire({
          position: "center",
          icon: "error",
          html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>Please LOG IN TO CONTINUE </b>`,
          showConfirmButton: false,
          timer: 1500,
        });
  };
  const renderAddToCart = () => {
    return listCart.findIndex((item) => {
      return item.maKhoaHoc === listCourses.maKhoaHoc;
    }) === -1 ? (
      <button className="add-cart" onClick={() => {
        addToCart()
      }}>
        Add To Cart
      </button>
    ) : (
      <NavLink className="add-cart" to="/my-cart">
        Go To Cart
      </NavLink>
    );
  };
  console.log(listCart);
  // const handleAddToCart = () => {
  // 	return courseOfUser ? (
  // 		courseOfUser.findIndex(item => {
  // 			return item.maKhoaHoc === course.maKhoaHoc;
  // 		}) === -1 ? (
  // 			renderAddToCart()
  // 		) : (
  // 			<NavLink className="btn--black btnn" to="/home/profile">
  // 				TỚI HỒ SƠ CÁ NHÂN
  // 			</NavLink>
  // 		)
  // 	) : (
  // 		renderAddToCart()
  // 	);
  // };

  const renderListCourses = () => {
    return listCourses.slice(2, showMore.itemsToShow).map((item, index) => {
      return (
        <div className="item-course col-sm-12 col-md-4 mt-5 " key={index}>
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
              <p className="description mt-3">{item.moTa.slice(0, 30)}...</p>
              <div className="button-show-info">
                <NavLink
                  className="detail"
                  to={`/detail/${item.maKhoaHoc}?${item.fee}`}
                >
                  Detail
                </NavLink>
                {/* <button className="add-cart" onClick={() => {
                 
                }}>
                  Add To Cart
                </button> */}
                {renderAddToCart(item.maKhoaHoc)}
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
              showMore.itemsToShow === 5
                ? setShowMore({ itemsToShow: 8, expanded: true })
                : setShowMore({ itemsToShow: 5, expanded: false }, scrollUp());
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
