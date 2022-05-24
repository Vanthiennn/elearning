import React, {  useState } from "react";
import "./style.scss";
import { useHistory  } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Searching() {
  const listCourses = useSelector(
    (state) => state.listCoursesReducer.listCourses
  );
  const [keyWord, setKeyWord] = useState({
    key: "",
  });
  const handleOnChange = (event) => {
    let key = event.target.value;
    setKeyWord({
      key,
    });
    console.log(key)
  };
  const history = useHistory()

  const renderSearchingCourse = () => {
    let course = listCourses
    
    const { key } = keyWord;
    const lowerCaseKey = key.toLowerCase();
    course = course.filter((item) => {
      const lowerCaseKhoaHoc = item.tenKhoaHoc.toLowerCase();
      const indexOfLowerCaseKhoaHoc = lowerCaseKhoaHoc.indexOf(lowerCaseKey);
      return indexOfLowerCaseKhoaHoc !== -1;
    });
    return course.map((item,index) => {
       return <div key={index} className="my-4 result" onClick={() => {
            history.push(`/detail/${item.maKhoaHoc}?${item.fee}`)
       }}>
          {item.tenKhoaHoc}
       </div>

    })
}
const search = () => {
    const {key} = keyWord
    if(key) {
       return renderSearchingCourse()
    } else {     
        let course = listCourses
        course = []
    }
}
  return (
    <div className="search">
      <input placeholder="What course are you looking for?" onChange={handleOnChange} />
      {search()}
    </div>
  );
}
