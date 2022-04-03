import * as ActionType from "./constants";
import { apiHome } from "utils/apiUtils";

export const actListCoursesApi = () => {
    return (dispatch) => {
      dispatch(actListCoursesRequest());
      apiHome
        .get("QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP05")
        .then((result) => {
          let listCourses = [];
          if (result.data) {
            listCourses = result.data.map((item) => ({
              ...item,
              fee:
                Math.floor(Math.random() * (Math.floor(100) - Math.ceil(50))) +
                Math.ceil(50),
            }));
          }
          dispatch(actListCoursesSuccess(listCourses));
        })
        .catch((error) => {
          dispatch(actListCoursesFailed(error.response.data));
        });
    };
  };
  
  const actListCoursesRequest = () => {
    return {
      type: ActionType.RENDER_LIST_COURSES_REQUEST,
    };
  };
  
  const actListCoursesSuccess = (listCourses) => {
    return {
      type: ActionType.RENDER_LIST_COURSES_SUCCESS,
      payload: listCourses,
    };
  };
  
  const actListCoursesFailed = (error) => {
    return {
      type: ActionType.RENDER_LIST_COURSES_FAILED,
      payload: error,
    };
  };