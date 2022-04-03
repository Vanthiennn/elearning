import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink} from "react-router-dom";
import SuggestCourse from "../SuggestCourse/suggestCourse";

import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faEye,
  faHeart,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { actAllCourse, applyFilter } from "./modules/action";

export default function AllCourse(props) { 
  const allCourse = useSelector((state) => state.allCourseReducer.allCourse);
  
  const [currentPage, changeCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState({
    key: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actAllCourse(currentPage));
  }, [currentPage]);

  const handleOnChange = (event) => {
    let key = event.target.value;
    setKeyWord({
      key,
    });
  };

  const renderCoursePage = () => {
    let { items: course } = allCourse
    let { key } = keyWord;
    course = course.filter((item) => {
      return item.tenKhoaHoc.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });
    return course.map((item, index) => {
      return (
        <Fragment key={index}>
          <div className="col-sm-6 col-md-4 col-lg-3 card-course mb-5">
            <div className="card-item h-100">
              <div className="image" style={{ height: 200 }}>
                <img src={item.hinhAnh} alt="" className="h-100 w-100" />
              </div>
              <div className="content-item d-flex justify-content-around mt-3">
                <div className="info-teacher-course">
                  <img
                    src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                    alt="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
                    style={{ width: 25, height: 25 }}
                  />
                  <p>{item.nguoiTao.hoTen.slice(0, 15)}</p>
                </div>
                <div className="name-course w-75">
                  <p>{item.tenKhoaHoc}</p>
                  <div className="d-flex justify-content-between">
                    <div className="student">
                      <FontAwesomeIcon icon={faGraduationCap} />
                      <label>Student</label>
                      <p>{item.soLuongHocVien}</p>
                    </div>
                    <div className="watch">
                      <FontAwesomeIcon icon={faEye} />
                      <label>Watch</label>
                      <p>{item.luotXem}</p>
                    </div>
                    <div className="fee">
                      <label>Price</label>
                      <p>${item.fee}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="show-info-course">
                <p className="mt-3">Date: {item.ngayTao}</p>
                <h4>{item.tenKhoaHoc}</h4>
                <p>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
                <div className="d-flex pr-3"></div>
                <span>
                  <FontAwesomeIcon icon={faEye} />
                  {item.luotXem} | <FontAwesomeIcon icon={faGraduationCap} />
                  {item.soLuongHocVien} | <FontAwesomeIcon icon={faHeart} /> 99{" "}
                </span>
                <p className="description mt-3">{item.moTa.slice(0, 30)}...</p>
                <div className="button-show-info d-flex justify-content-around">
                  <NavLink
                    className="detail"
                    to={`/detail/${item.maKhoaHoc}?${item.fee}`}
                  >
                    Detail
                  </NavLink>
                  <NavLink className="add-cart" to="/my-cart">
                    Add to cart
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    });
  };
  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          dispatch(applyFilter('a-z', allCourse))
        }}
      >
        A - Z
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => {
          dispatch(applyFilter('price:asc', allCourse))
        }}
      >
        Increasing Price
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          dispatch(applyFilter('price:desc', allCourse))
        }}
      >
        Decreasing Price
      </Menu.Item>
    </Menu>
  );

  const renderPagi = ( pages ) => {
    const items = []
    for(let i = 1; i <= pages; i++) {
      items.push(
        <li key={ i }>
          <button
            className={ i === currentPage ? 'active': '' }
            onClick={() => {
              changeCurrentPage(i);
            }}
          >
            { i }
          </button>
        </li>
      )
    }
    return (
      <ul className="pagination">
        { items }
      </ul>
    )
  }
  return (
    <div className="py-5 all-course">
      <div className="background-course">
        <div className="overlay"></div>
        <div className="image-course"></div>
        <div className="title-course">
          <h3 className="text-white">Our Course</h3>
          <NavLink to="/">Home /</NavLink>
          <NavLink to={`/courses/all`}> Our Course</NavLink>
        </div>
      </div>
      <div className="arrange-search">
        <div className="arrange">
          <Dropdown overlay={menu} trigger={["click"]}>
            <button
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              href="/#"
            >
              Course Arrangement <DownOutlined />
            </button>
          </Dropdown>
        </div>
        <div className="search">
          <input
            placeholder="Searching course"
            onChange={(event) => {
              handleOnChange(event);
            }}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="content my-5">
      <div className="row mx-0">{renderCoursePage()}</div>
            { allCourse && allCourse.totalPages > 0 &&
              renderPagi( allCourse.totalPages )
            }
      </div>
      <SuggestCourse />
    </div>
  );
}
