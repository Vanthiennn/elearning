import React, { useEffect } from "react";
import "./style.scss"
import { actCategoryApi } from "store/category/actions";
import { useSelector, useDispatch } from "react-redux";
import { NavLink,useHistory } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
export default function Categories() {
  const {  data } = useSelector(state => state.categoryReducer);
  const dispatch = useDispatch();
  const history = useHistory()

  const renderCategories = () => {
    if (data) {
      return data.map((item, index) => {
        return (
          <NavLink  className="item-category col-sm-4  col-md-2 mt-2 " to={`/category/${item.maDanhMuc}`} onClick={(e) => {
            e.preventDefault();
            history.push(`/category/${item.maDanhMuc}`);
            window.location.reload();
          }} key={index}>
            <div className="overlay"></div>
            <div className="imageCategory">
              <img
                src={`/img/${index + 1}.jpg`}
                alt={`/img/${index + 1}.jpg`}
                style={{
                  borderRadius: "20%",
                }}
              />
            </div>
            <div className="content text-center">
              <h6 className="textCategory">{item.tenDanhMuc.toUpperCase()}</h6>
            </div>
          </NavLink>
        );
      });
    }
  };
  useEffect(() => {
    dispatch(actCategoryApi());
  }, []);
  return (
    <div style={{overflow:"hidden"}} id="category">
      <div className="categories text-center" data-aos="fade-left" data-aos-duration="2000">
      <div className="wallpaper">
        <img src="/img/bg-3.png" alt="/img/bg-3.png" />
      </div>
      <h3 className="titleCategory">Our Category</h3>
      <div className="container">
        <div className="d-flex justify-content-around row my-5">
          {renderCategories()}
        </div>
      </div>
    </div>
    </div>
  );
}
