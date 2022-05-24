import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";
import { actFetchListCourseAdmin } from "store/courseAdmin/actions";

const actAddCourseRequest = () => {
    return {
        type: ActionType.ADD_COURSE_REQUEST
    }
}

const actAddCourseSuccess = (data) => {
    return {
        type: ActionType.ADD_COURSE_SUCCESS,
        payload: data
    }
}

const actAddCourseFailed = (error) => {
    return {
        type: ActionType.ADD_COURSE_FAILED,
        payload: error
    }
}

export const actAddCourseAdmin = (formData, history) => {
    return dispatch => {
        dispatch(actAddCourseRequest())
        apiAdmin
            .post("QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData)
            .then((result) => {
                dispatch(actAddCourseSuccess(result.data));
                alert("Success!");
                history.push("/admin/course-list");
                dispatch(actFetchListCourseAdmin())
            })
            .catch((error) => {
                dispatch(actAddCourseFailed(error.response.data))
                alert(error.response.data)
            })
    }
}

export const actUploadCourseImg = (file) => {
    return dispatch => {
        apiAdmin   
            .post("QuanLyKhoaHoc/UploadHinhAnhKhoaHoc", file)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }
}