import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";

const actGetListUserRegisteredRequest = () => {
    return {
        type: ActionType.LIST_USER_REGISTERED_REQUEST
    }
}

const actGetListUserRegisteredSuccess = (data) => {
    return {
        type: ActionType.LIST_USER_REGISTERED_SUCCESS,
        payload: data
    }
}

const actGetListUserRegisteredFailed = (error) => {
    return {
        type: ActionType.LIST_USER_REGISTERED_FAILED,
        payload: error
    }
}

export const actFetchListUserRegistered = (idCourse) => {
    return dispatch => {
        dispatch(actGetListUserRegisteredRequest())
        apiAdmin
            .post("QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", idCourse)
            .then((result) => {
                dispatch(actGetListUserRegisteredSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actGetListUserRegisteredFailed(error.response.data))
            })
    }
}

export const actUnsubsCourseAdmin = (infoUnsubs, idCourse) => {
    return dispatch => {
        apiAdmin
            .post("QuanLyKhoaHoc/HuyGhiDanh", infoUnsubs)
            .then((result) => {
                alert("Unsubscibe Success!")
                dispatch(actFetchListUserRegistered(idCourse))
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