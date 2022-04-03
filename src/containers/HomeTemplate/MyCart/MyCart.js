import React, { Fragment } from "react";
import SuggestCourse from "../SuggestCourse/suggestCourse";
import { useSelector, useDispatch } from "react-redux";
import { actDeleteCart, actRegisterCourse } from "./module/actions";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
export default function MyCart(props) {
  const listCart = useSelector((state) => state.listCartReducer.listCart);
  const dispatch = useDispatch();
  const totalCart = () => {
    return listCart.reduce((total, item) => {
      return (total += item.fee);
    }, 0);
  };
  const history = useHistory();
  const errOnRegister = (err) => {
    Swal.fire({
      position: "center",
      icon: "error",
      html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>${err}</b>`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleOnRegister = () => {
    localStorage.getItem("UserHome")
      ? listCart.length
        ? dispatch(actRegisterCourse(listCart, props.history))
        : errOnRegister("NO MORE COURSE IN CART")
      : errOnRegister("YOU ARE NOT LOGIN");
  };
  const renderCourseInCart = () => {
    return listCart.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="d-flex justify-content-between item-cart">
            <div
              className="d-flex w-75 detail-cart"
              onClick={() => {
                history.push(`/detail/${item.maKhoaHoc}?${item.fee}`);
              }}
            >
              <img
                src={item.hinhAnh}
                alt=""
                style={{ width: 100, height: 100 }}
              />
              <div
                style={{ marginLeft: 12, lineHeight: "10px", fontWeight: 700 }}
              >
                <h5 style={{ fontWeight: 700 }}>{item.tenKhoaHoc}</h5>
                <p style={{ color: "#6a6f73", fontWeight: 400 }}>
                  {item.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
                </p>
              </div>
            </div>
            <div className="fee-cart">
              <p>${item.fee}</p>
            </div>
            <div className="delete-cart">
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(actDeleteCart(item.maKhoaHoc));
                }}
              >
                Remove
              </a>
            </div>
          </div>
        </Fragment>
      );
    });
  };

  return (
    <>
      <div style={{ paddingTop: "200px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h3 style={{ fontWeight: 700 }}>Shopping Cart</h3>
              <p
                style={{ color: "#7f7f7f", fontSize: 20, marginBottom: "3rem" }}
              >
                {listCart.length} Course in Cart
              </p>
              <div className="list-cart">{renderCourseInCart()}</div>
            </div>
            <div className="col-md-4">
              <div className="total-cart">
                <h3>Order Information </h3>
                <p>Amount Course: {listCart.length}</p>
                <hr />
                <h1>Total: {totalCart()}$</h1>
                <div>
                  <button
                    className="buttonBlue w-100"
                    onClick={handleOnRegister}
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuggestCourse />
    </>
  );
}
