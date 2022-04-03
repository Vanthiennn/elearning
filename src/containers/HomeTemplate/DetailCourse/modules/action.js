import * as ActionType from "./constant"
import { apiHome } from "utils/apiUtils"


export const actDetailCourse = (maKhoaHoc) => {
    return (dispatch) => {
        dispatch(actDetailCourseRequest())
        apiHome
        .get(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`)
        .then((result) =>{
            dispatch(actDetailCourseSuccess(result.data))
        })
        .catch((error) => {
            console.log(error.response.data)
        })
    }
}

const actDetailCourseRequest = () => {
    return {
        type:ActionType.GET_DETAIL_REQUEST
    }
}

const actDetailCourseSuccess = (detailCourse) => {
    return {
        type:ActionType.GET_DETAIL_SUCCESS,
        payload:detailCourse
    }
}

const actDetailCourseFailed = (error) => {
    return {
        type:ActionType.GET_DETAIL_FAILED,
        payload:error
    }
}