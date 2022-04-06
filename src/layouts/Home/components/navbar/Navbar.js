import { ShoppingCartOutlined } from "@ant-design/icons";
import "./style.scss"
import React, { Fragment,useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Space } from "antd";
import { useSelector } from "react-redux";
import _ from "lodash";


export default function Navbar(props) {
  const [isNavOpen, setNavOpen] = useState(true);
  let location = useLocation();
  const [state,setState] = useState({
    fee:""
  })
  const { userLogin } = useSelector((state) => state.loginReducer);
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const totalQuantity = useSelector(state => state.cartReducer.totalQuantity)

  const history = useHistory();
  useEffect(() => {
    let { search } = location
    setState({
      fee:search.slice(1,search.length)
    })
  },[])
  const totalCart = () => {
    return cartItems.reduce((total, item) => {
      if(location.search === ""){
        return (total += item.fee);
      } else {
        return (total +=state.fee * 1)
      }
    }, 0);
  };

  const renderCart = () => {
    return cartItems.map((item, index) => {
      return (
        <Fragment key={index}>
          <div
            className="d-flex my-4"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              history.push(`/detail/${item.maKhoaHoc}?${state.fee}`);
              window.location.reload();
            }}
          >
            <img src={item.hinhAnh} alt="" style={{ width: 100, height: 100 }} />
            <div
              style={{ marginLeft: 12, lineHeight: "10px", fontWeight: 700 }}
            >
              <h5 style={{ fontWeight: 700 }}>{item.tenKhoaHoc}</h5>
              <p style={{ color: "#6a6f73", fontWeight: 400 }}>
                {item.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
              </p>
              <p>${location.search === "" ? item.fee : state.fee}</p>
            </div>
          </div>
          <hr />
        </Fragment>
      );
    });
  };

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="buttonBlue mx-3 text-white"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              history.push("/register");
            }}
            className="buttonPink text-white"
          >
            Register
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button
          onClick={() => {
            history.push("/profile");
          }}
          className="buttonBlue mx-3 text-white"
        >
          {userLogin.taiKhoan}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("UserHome");
            history.push("/");
            window.location.reload();
          }}
          className="buttonPink text-white"
        >
          Log Out
        </button>
      </Fragment>
    );
  };
  return (
    <>
      <div
        className={isNavOpen ? "mainNavbar" : "mainNavbar2"}
        style={{ backgroundColor: location.pathname === "/" ? "" : "#84cc8e" }}
      >
        <nav className="navbar navbar-expand-md navbar-light ">
          <NavLink
            exact
            activeClassName="active"
            className="nav-link nav-logo"
            to="/"
          >
            <img
              src="/img/logo.png"
              alt="/img/logo.png"
              className="img-fluid"
              style={{ width: 200 }}
            />
          </NavLink>
          {/* Responsive cart and button  */}
          <div className="cartNav cartNavRes">
          <Space
              className="cartIcon"
              onClick={(e) => {
                // e.preventDefault();
                history.push(`/my-cart?${state.fee}`);
                window.location.reload();
              }}
            >
              <ShoppingCartOutlined />
            </Space>
            <span className="cartNum">{totalQuantity}</span>
            <div className="listCart px-3 mobile">
              {totalQuantity === 0 ? (
                <div className="no-course">
                  Your cart is empty
                </div>
              ) : (
                <Fragment>
                  {renderCart()}
                  <div
                    className="total"
                    style={{ fontWeight: 700, fontSize: 20 }}
                  >
                    TOTAL: ${totalCart()}{" "}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
          {/* Toggler/collapsibe Button */}
          <div className="toggleResponsive bg-white">
            <button
              className={isNavOpen ? "toggle" : "clicked"}
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
              onClick={() => {
                setNavOpen(!isNavOpen);
              }}
            >
              <span className="toggle_line toggle_line1"></span>
              <span className="toggle_line toggle_line2"></span>
              <span className="toggle_line toggle_line3"></span>
            </button>
          </div>

          {/* Navbar links */}
          <div
            className="collapse navbar-collapse justify-content-center mt-3"
            id="collapsibleNavbar"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                {_.isEmpty(userLogin) ?  <NavLink
                  activeClassName="active"
                  className="nav-link textNav textNavRes "
                  to="/login"
                >
                  SIGN IN
                </NavLink>  : <NavLink
                  activeClassName="active"
                  className="nav-link textNav textNavRes "
                  to="/profile"
                >
                  {userLogin.taiKhoan}
                </NavLink>}
              </li>
              <li className="nav-item">
                {_.isEmpty(userLogin) ? <NavLink
                  activeClassName="active"
                  className="nav-link textNav textNavRes "
                  to="/register"
                >
                  REGISTER
                </NavLink> : <NavLink
                  activeClassName="active"
                  className="nav-link textNav textNavRes "
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("UserHome");
                    history.push("/");
                    window.location.reload();
                  }}
                >
                  Log Out
                </NavLink> }
                
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link textNav "
                  to="/"
                >
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link textNav"
                  to="/courses/all"
                >
                  COURSE
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="cartNav cartWeb">
            <Space
              className="cartIcon"
              onClick={(e) => {
                e.preventDefault();
                history.push(`/my-cart?${state.fee}`);
                window.location.reload();
              }}
            >
              <ShoppingCartOutlined />
            </Space>
            <span className="cartNum">{totalQuantity}</span>
            <div className="listCart px-3">
              {totalQuantity === 0 ? (
                <div className="no-course">
                  Your cart is empty
                </div>
              ) : (
                <Fragment>
                  {renderCart()}
                  <div
                    className="total"
                    style={{ fontWeight: 700, fontSize: 20 }}
                  >
                    TOTAL: ${totalCart()}{" "}
                  </div>
                </Fragment>
              )}
            </div>
          </div>

          <div style={{ display: "flex" }}>{renderLogin()}</div>
        </nav>
      </div>
    </>
  );
}
