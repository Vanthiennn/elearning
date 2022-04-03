import { combineReducers } from "redux";
import categoryReducer from "containers/HomeTemplate/_components/categories/modules/reducer";
import listCoursesReducer from "containers/HomeTemplate/_components/courses/modules/reducer";
import detailCourseReducer from "containers/HomeTemplate/DetailCourse/modules/reducer";
import allCourseReducer from "containers/HomeTemplate/AllCourse/modules/reducer";
import loginReducer from "containers/HomeTemplate/Login/modules/reducer";
import registerReducer from "containers/HomeTemplate/Register/modules/reducer";
import detailCategoryReducer from "containers/HomeTemplate/DetailCategory/modules/reducer";
import listCartReducer from "containers/HomeTemplate/MyCart/module/reducer";
import profileUserReducer from "containers/HomeTemplate/Profile/modules/reducer";
const rootReducer = combineReducers({
    categoryReducer,
    listCoursesReducer,
    detailCourseReducer,
    detailCategoryReducer,
    allCourseReducer,
    loginReducer,
    registerReducer,
    listCartReducer,
    profileUserReducer
})

export default rootReducer