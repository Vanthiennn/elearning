import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetInfoUser, actUpdateInfo } from "store/profileUser/actions";
import Swal from "sweetalert2";
import "./style.scss"
export default function Profile() {
  const infoUser = useSelector((state) => state.profileUserReducer.infoUser);
  const listCourses = useSelector(
    (state) => state.listCoursesReducer.listCourses
  );
  
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
      let a = document.getElementsByClassName("form-control");
      for (let i = 1; i < a.length; i++) {
        a[i].setAttribute("disabled", true);
      }
    }
  };
  useEffect(() => {
    dispatch(actGetInfoUser());
  }, []);
  const renderAccountInfo = () => {
    return (
      <Fragment>
        <form className="AccountInfo">
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
        <div className="button">
          <button className="btn--purple" onClick={handleOnSave}>
            Save
          </button>
        </div>
      </Fragment>
    );
  };
  const renderRegisterCourse = () => {
    let { chiTietKhoaHocGhiDanh } = infoUser;
    return chiTietKhoaHocGhiDanh
      .filter((item) => {
        let index = listCourses.findIndex(i => {
          return (i.maKhoaHoc = item.maKhoaHoc);
        })
        return index !== -1
      })
      .map((i, index) => {
        return <Fragment key={index}>
          <div className="register-course">{i.biDanh}
          <a>Remove</a></div>
          
           
          
        </Fragment>;
      });
  };
  return (
    <section className="profileUser" style={{ padding: "300px 50px" }}>
      <div className="wrap-profileUser">
        <div className="row m-0 all-table">
          <div className="col-3 profile-navigation-bar">
            <div className="border-avatar">
              <div className="profile-avatar">
                <img
                  src="http://bootdey.com/img/Content/User_for_snippets.png"
                  alt=""
                  style={{ width: 100, height: 100 }}
                />
              </div>
              <p className="user-name">{infoUser.taiKhoan}</p>
              <div className="bottom-line"></div>
            </div>
            {/* Nav tabs */}
            <ul className="nav nav-tabs container profile-list-menu">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#home">
                  Infomation User
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#menu1">
                  Attended Course
                </a>
              </li>
              <li>
                <a className="nav-link" data-toggle="tab" href="#menu2">
                 Change Password
                </a>
                
              </li>
            </ul>
          </div>
          <div className="col-9 profile-infomation-table">
            <div className="profile-table-menu">
              {/* Tab panes */}
              <div className="tab-content">
                <div className="tab-pane container active" id="home">
                  <div className="Table-header">
                    <h3>Info User</h3>
                    <p>View information or edit your information at here</p>
                    <div className="bottom-line"></div>
                  </div>
                  <div className="Table-Content">{renderAccountInfo()}</div>
                </div>
                <div className="tab-pane container fade" id="menu1">
                  <div className="Table-header">
                    <h3>Registered course</h3>
                    <p>Information about the course you are register in</p>
                    <div className="bottom-line"></div>
                  </div>
                  <div className="Table-Content">
                    <div className="d-flex justify-content-between">
                      <p>Course</p>
                      <p>Cancel Course</p>
                    </div>
                    <div className="d-flwx justify-content-between">{renderRegisterCourse()}</div>
                  </div>
                </div>
                <div className="tab-pane container fade" id="menu2">abc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
