import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";

const actGetInfoCourseRequest = () => {
    return {
        type: ActionType.GET_INFO_COURSE_REQUEST
    }
}

const actGetInfoCourseSuccess = (data) => {
    return {
        type: ActionType.GET_INFO_COURSE_SUCCESS,
        payload: data
    }
}

const actGetInfoCourseFailed = (error) => {
    return {
        type: ActionType.GET_INFO_COURSE_FAILED,
        payload: error
    }
}

export const actEditCourseAdmin = (formData, history) => {
    return dispatch => {
        apiAdmin
            .post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData)
            .then((result) => {
                alert("Update Success!");
                history.push("/admin/course-list")
            })
            .catch((error) => {
                alert(error.response.data);
            })
    }
}



export const actGetInfoCourseAdmin = (courseCode) => {
    return dispatch => {
        dispatch(actGetInfoCourseRequest())
        apiAdmin
            .get(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseCode}`)
            .then((result) => {
                dispatch(actGetInfoCourseSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actGetInfoCourseFailed(error.response.data))
            })
    }
}