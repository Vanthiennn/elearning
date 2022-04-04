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
import userListAdminReducer from "./userAdmin";
import courseListRegisteredReducer from "./unsubscribeByUser";
import userListRegisteredReducer from "./unsubscribeByCourse";
import courseListUnsubsReducer from "./subscribeByUser";
import userListUnsubsReducer from "./subscribeByCourse";
import editUserReducer from "./editUserAdmin";
import editCourseAdminReducer from "./editCourseAdmin";
import listCourseReducer from "./courseAdmin";
import authReducer from "./auth";
import userListWaitApprovalReducer from "./approvalUser";
import courseListWaitApprovalReducer from "./approvalCourse";
import addUserReducer from "./addUserAdmin";
import addCourseReducer from "store/addCourseAdmin";

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
  userListAdminReducer,
  courseListRegisteredReducer,
  userListRegisteredReducer,
  courseListUnsubsReducer,
  userListUnsubsReducer,
  editUserReducer,
  editCourseAdminReducer,
  listCourseReducer,
  authReducer,
  userListWaitApprovalReducer,
  courseListWaitApprovalReducer,
  addUserReducer,
  addCourseReducer,
});

export default rootReducer;
