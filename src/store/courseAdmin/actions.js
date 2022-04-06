import * as ActionType from "./constants";
import { apiAdmin, groupID } from "utils/apiUtils";

const actListCourseRequest = () => {
    return {
        type: ActionType.LIST_COURSE_REQUEST
    }
}

const actListCourseSuccess = (data) => {
    return {
        type: ActionType.LIST_COURSE_SUCCESS,
        payload: data
    }
}

const actListCourseFailed = (error) => {
    return {
        type: ActionType.LIST_COURSE_FAILED,
        payload: error
    }
}

export const actFetchListCourseAdmin = () => {
    return dispatch => {
        dispatch(actListCourseRequest())
        apiAdmin
            .get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupID.maNhom}`)
            .then((result) => {
                dispatch(actListCourseSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actListCourseFailed(error.data))
            })
    }
}

export const getCourseCatalog = () => {
    return dispatch => {
        apiAdmin
            .get("QuanLyKhoaHoc/LayDanhMucKhoaHoc")
            .then((result) => {
                dispatch({
                    type: ActionType.COURSE_CATALOG,
                    payload: result.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actDeleteCourseAdmin = (course) => {
    return (dispatch) => {
        apiAdmin
            .delete(`QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${course}`)
            .then((result) => {
                alert(`Delete success ${course} !`);
                dispatch(actFetchListCourseAdmin());
            })
            .catch((error) => {
                alert(error.response.data);
            })
    }
}

