import React, { useEffect } from "react";
import SuggestCourse from "components/SuggestCourse";
import { actDetailCateApi } from "store/detailCategory/actions";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Categories from "../HomePage/categories";
import { addToCart as actAddToCarting } from "store/cart/actions";
import "./style.scss";
export default function DetailCategory(props) {
  const detailCate = useSelector(
    (state) => state.detailCategoryReducer.detailCate
  );
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    const { maDanhMuc } = props.match.params;
    dispatch(actDetailCateApi(maDanhMuc));
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

  const renderDetailCate = () => {
    return detailCate.map((item, index) => {
      return (
        <div className="item-course col-sm-12 col-md-4 mt-5 " key={index}>
          <div className="wallpaper">
            <img src={item.hinhAnh} alt={item.hinhAnh} />
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
              <p className="description mt-3" style={{width:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.moTa}</p>
              <div className="button-show-info">
                <NavLink
                  className="detail"
                  to={`/detail/${item.maKhoaHoc}?${item.fee}`}
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
  return (
    <div style={{ paddingTop: 130, paddingBottom: 130 }}>
      <Categories />
      <h3 className="text-center">
        Category:{" "}
        {detailCate && detailCate[0]?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
      </h3>
      <div className="my-5">
        <div className="container">
          <div className="row">{renderDetailCate()}</div>
        </div>
      </div>
      <SuggestCourse />
    </div>
  );
}
