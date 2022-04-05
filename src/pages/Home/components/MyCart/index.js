import React, { Fragment,useEffect,useState } from "react";
import SuggestCourse from "components/SuggestCourse";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart as actRegisterCourse } from "store/cart/actions";
import { removeFromCart as actDeleteCart } from "store/cart/actions";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./style.scss"
export default function MyCart(props) {
  const [state,setState] = useState({
    fee:""
  })
  // const listCart = useSelector((state) => state.listCartReducer.listCart);
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const totalQuantity = useSelector((state) => state.cartReducer.totalQuantity);
  const dispatch = useDispatch();
  const totalCart = () => {
    return cartItems.reduce((total, item) => {
      if(props.location.search === "") {
        return (total += item.fee);
      } else {
        return (total += state.fee * 1)
      }
    }, 0);
  };
  useEffect(() => {
    let {search} = props.location
    setState({
      fee:search.slice(1,search.length)
    })
    
  },[])
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
      ? totalQuantity
        ? dispatch(actRegisterCourse(cartItems, props.history))
        : errOnRegister("NO MORE COURSE IN CART")
      : errOnRegister("YOU ARE NOT LOGIN");
  };
  const renderCourseInCart = () => {
    return cartItems.map((item, index) => {
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
              <p>${props.location.search === "" ? item.fee : state.fee}</p>
            </div>
            <div className="delete-cart">
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(actDeleteCart(item));
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
                {totalQuantity} Course in Cart
              </p>
              <div className="list-cart">{renderCourseInCart()}</div>
            </div>
            <div className="col-md-4 mt-3">
              <div className="total-cart">
                <h3>Order Information </h3>
                <p>Amount Course: {totalQuantity}</p>
                <hr />
                <h1>Total: {totalCart()}$</h1>
                <div>
                  <button
                    className="btn btn-info w-100 mt-3"
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
