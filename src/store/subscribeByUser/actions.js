import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";

const actGetListCourseUnsubsRequest = () => {
    return {
        type: ActionType.LIST_COURSE_UNSUBS_REQUEST
    }
}

const actGetListCourseUnsubsSuccess = (data) => {
    return {
        type: ActionType.LIST_COURSE_UNSUBS_SUCCESS,
        payload: data
    }
}

const actGetListCourseUnsubsFailed = (error) => {
    return {
        type: ActionType.LIST_COURSE_UNSUBS_FAILED,
        payload: error
    }
}

export const actFetchListCourseUnsubs = (account) => {
    return dispatch => {
        dispatch(actGetListCourseUnsubsRequest())
        apiAdmin
            .post(`QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${account}`)
            .then((result) => {
                dispatch(actGetListCourseUnsubsSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actGetListCourseUnsubsFailed(error.response.data))
            })
    }
}

export const actRegisterCourse = (infoRegister, account) => {
    return dispatch => {
        apiAdmin
            .post("QuanLyKhoaHoc/DangKyKhoaHoc", infoRegister)
            .then((result) => {
                alert("Register Success");
                dispatch(actFetchListCourseUnsubs(account))
            })
            .catch((error) => {
                alert(error.response.data)
            })
    }
}

export const actGetKeyword = (keyword) => {
    return {
        type: ActionType.GET_KEYWORD,
        payload: keyword
    }
}