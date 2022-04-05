import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actListCoursesApi } from "store/listCourses/actions";
import { addToCart as actAddToCarting } from "store/cart/actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useHistory } from "react-router-dom";
import "./style.scss"

export default function SuggestCourse(props) {
  
  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const history = useHistory();
  const listCourses = useSelector(
    (state) => state.listCoursesReducer.listCourses
    );
    const cartItems = useSelector((state) => state.cartReducer.cartItems);
  
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(actListCoursesApi());
  }, []);

  const addToCart = (item) => {
    dispatch(actAddToCarting(item))
  }

  const renderAddToCart = (items) => {
    return cartItems.findIndex((item) => {
      return  item.maKhoaHoc === items.maKhoaHoc    ;
    }) === -1 ? (
      <button className="add-cart" onClick={(e) => {
        e.preventDefault()
        addToCart(items)
      }}>
        Add To Cart
      </button>
    ) : (
      <NavLink className="add-cart go-cart" to="/my-cart">
        Go To Cart
      </NavLink>
    );
  };

  const renderSuggestCourse = () => {
    return listCourses.map((item, index) => {
      return (
        <div key={index} className="item-course  mt-3 mb-0">
          <div className="suggest-image">
            <div className="wallpaper">
              <img src={item.hinhAnh} alt={item.hinhAnh} />
              <div className="overlay"></div>
              <div className="name-courses">
                <h4>{item.tenKhoaHoc}</h4>
                <p>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
              </div>
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
                    style={{ width: 25, height: 25,display:"inline-block" }}
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
                  to={`/detail/${item.maKhoaHoc}`}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/detail/${item.maKhoaHoc}?${item.fee}`);
                    window.location.reload();
                    goToTop();
                  }}
                >
                  Detail
                </NavLink>
               {renderAddToCart(item)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const setting = {
    loop: false,
    margin: 20,
    items: 4,
    slideBy: 4,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items:2,
        nav: false,
      },
      1200: {
        items: 4,
        nav: true,
        loop: false,
      },
    },
  };
  return (
    <div className="my-5">
      <h3>You might also like</h3>

      <OwlCarousel {...setting} nav className="owl-theme" key={listCourses.length}>{renderSuggestCourse()}</OwlCarousel>
    </div>
  );
}
