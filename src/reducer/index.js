import { combineReducers } from "redux";
import authReducer from "containers/AdminTemplate/AuthPage/modules/reducer";
import userListAdminReducer from "containers/AdminTemplate/UserPage/modules/reducer";
import addUserReducer from "containers/AdminTemplate/AddUserPage/modules/reducer";
import editUserReducer from "containers/AdminTemplate/EditUserPage/modules/reducer";
import listCourseReducer from "containers/AdminTemplate/CoursePage/modules/reducer";
import addCourseReducer from "containers/AdminTemplate/AddCoursePage/modules/reducer";
import editCourseAdminReducer from "containers/AdminTemplate/EditCoursePage/modules/reducer";
import userListUnsubsReducer from "containers/AdminTemplate/SubscribeByCoursePage/modules/reducer";
import userListRegisteredReducer from "containers/AdminTemplate/UnsubscribeByCoursePage/modules/reducer";
import userListWaitApprovalReducer from "containers/AdminTemplate/ApprovalPage/modules/reducer";
import courseListUnsubsReducer from "containers/AdminTemplate/SubscribeByUserPage/modules/reducer";
import courseListWaitApprovalReducer from "containers/AdminTemplate/ApprovalCoursePage/modules/reducer";
import courseListRegisteredReducer from "containers/AdminTemplate/UnsubscribeByUserPage/modules/reducer";

const rootReducer = combineReducers({
    authReducer,
    userListAdminReducer,
    addUserReducer,
    editUserReducer,
    listCourseReducer,
    addCourseReducer,
    editCourseAdminReducer,
    userListUnsubsReducer,
    userListRegisteredReducer,
    userListWaitApprovalReducer,
    courseListUnsubsReducer,
    courseListWaitApprovalReducer,
    courseListRegisteredReducer
})

export default rootReducer