import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actGetInfoUser,
  actUpdateInfo,
  actCancelRegisterCourse,
} from "store/profileUser/actions";
import Swal from "sweetalert2";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function Profile() {
  const infoUser = useSelector((state) => state.profileUserReducer.infoUser);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "HV",
    maNhom: "GP05",
    email: "",
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleOnSave = (e) => {
    if (
      state.matKhau === "" &&
      state.hoTen === "" &&
      state.soDT === "" &&
      state.email === ""
    ) {
      let data = "You have not edited the information";
      Swal.fire({
        position: "center",
        icon: "error",
        html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>${data.toUpperCase()}</b>`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      e.preventDefault();
      dispatch(actUpdateInfo(state));
    }
  };
  useEffect(() => {
    dispatch(actGetInfoUser());
  }, []);
  const renderAccountInfo = () => {
    return (
      <Fragment>
        <form className="AccountInfo mt-3">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="taiKhoan"
              className="form-control effect-7"
              placeholder="Username "
              aria-describedby="helpId"
              onChange={handleOnchange}
              defaultValue={infoUser.taiKhoan}
            />
          </div>
          <div className="form-group">
            <label>FullName </label>
            <input
              type="text"
              name="hoTen"
              className="form-control"
              placeholder="FullName "
              aria-describedby="helpId"
              onChange={handleOnchange}
              defaultValue={infoUser.hoTen}
            />
          </div>
          <div className="form-group">
            <label>Phone number </label>
            <input
              type="text"
              name="soDT"
              className="form-control"
              placeholder="Phone number "
              aria-describedby="helpId"
              onChange={handleOnchange}
              defaultValue={infoUser.soDT}
            />
          </div>
          <div className="form-group">
            <label>Email </label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email "
              aria-describedby="helpId"
              onChange={handleOnchange}
              defaultValue={infoUser.email}
            />
          </div>
        </form>
        <div className="button text-right mt-3 mr-3 ">
          <button className="btn btn-info py-2 px-4" onClick={handleOnSave}>
            Save
          </button>
        </div>
      </Fragment>
    );
  };
  const renderRegisterCourse = () => {
    const { chiTietKhoaHocGhiDanh } = infoUser;
    return chiTietKhoaHocGhiDanh?.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="d-flex justify-content-between item-cart mt-5">
            <div className="d-flex w-75 detail-cart">
              <img
                src={item.hinhAnh}
                alt=""
                style={{ width: 100, objectFit: "cover" }}
              />
              <div
                style={{ marginLeft: 12, lineHeight: "10px", fontWeight: 700 }}
              >
                <h5 style={{ fontWeight: 700 }}>{item.tenKhoaHoc}</h5>
                <p style={{ color: "#6a6f73", fontWeight: 400 }}>{item.moTa}</p>
              </div>
            </div>
            <div className="delete-cart">
              <a
                href="#/"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    actCancelRegisterCourse(
                      {
                        maKhoaHoc: item.maKhoaHoc,
                        taiKhoan: infoUser.taiKhoan,
                      },
                      item.maKhoaHoc
                    )
                  );
                }}
              >
                <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20 }} />
              </a>
            </div>
          </div>
        </Fragment>
      );
    });
  };
  return (
    <section
      className="profileUser"
      style={{ padding: "200px 50px 100px 50px" }}
    >
      <div className="wrap-profileUser">
        <div className="row m-0 all-table">
          <div className="col-sm-12 col-md-3 profile-navigation-bar text-center">
            <div className="border-avatar">
              <div className="profile-avatar">
                <img
                  src="http://bootdey.com/img/Content/User_for_snippets.png"
                  alt=""
                  style={{ width: 100, height: 100 }}
                />
              </div>
              <p className="user-name my-4">{infoUser.taiKhoan}</p>
            </div>
            {/* Nav tabs */}
            <ul className="nav  profile-list-menu p-0 justify-content-around mb-5">
              <li className="nav-item w-100 my-3">
                <a className="nav-link active" data-toggle="tab" href="#home">
                  Infomation User
                </a>
              </li>
              <li className="nav-item w-100 my-3">
                <a className="nav-link" data-toggle="tab" href="#menu1">
                  Attended Course
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-9 profile-infomation-table">
            <div className="profile-table-menu">
              {/* Tab panes */}
              <div className="tab-content">
                <div className="tab-pane container active" id="home">
                  <div className="Table-header text-center">
                    <h3>Info User</h3>
                    <p>View information or edit your information at here</p>
                    <div className="bottom-line"></div>
                  </div>
                  <div className="Table-Content">{renderAccountInfo()}</div>
                </div>
                <div className="tab-pane container fade" id="menu1">
                  <div className="Table-header text-center">
                    <h3>Registered course</h3>
                    <p>Information about the course you are register in</p>
                    <div className="bottom-line"></div>
                  </div>
                  <div className="Table-Content">
                    <div className="d-flex justify-content-between title-profile-cart">
                      <p>Course</p>
                      <p>Cancel Course</p>
                    </div>
                    <div className="d-flwx justify-content-between">
                      {infoUser.chiTietKhoaHocGhiDanh?.length === 0 ? (
                        <p
                          className="mt-3 text-center"
                          style={{ fontSize: 20 }}
                        >
                          You are not register any course in here
                        </p>
                      ) : (
                        renderRegisterCourse()
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
