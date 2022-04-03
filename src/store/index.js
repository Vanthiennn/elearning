import { combineReducers } from "redux";

import categoryReducer from "./category";
import listCoursesReducer from "./listCourses";
import detailCourseReducer from "./detailCourse";
import allCourseReducer from "./allCourse";
import loginReducer from "./login";
import registerReducer from "./register";
import detailCategoryReducer from "./detailCategory";
import listCartReducer from "./listCart";
import profileUserReducer from "./profileUser";
const rootReducer = combineReducers({
  categoryReducer,
  listCoursesReducer,
  detailCourseReducer,
  detailCategoryReducer,
  allCourseReducer,
  loginReducer,
  registerReducer,
  listCartReducer,
  profileUserReducer,
});

export default rootReducer;
