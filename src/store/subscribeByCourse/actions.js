import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";

const actGetListUserUnsubsRequest = () => {
    return {
        type: ActionType.LIST_USER_UNSUBS_REQUEST
    }
}

const actGetListUserUnsubsSuccess = (data) => {
    return {
        type: ActionType.LIST_USER_UNSUBS_SUCCESS,
        payload: data
    }
}

const actGetListUserUnsubsFailed = (error) => {
    return {
        type: ActionType.LIST_USER_UNSUBS_FAILED,
        payload: error
    }
}

export const actFetchListUserUnsubs = (idCourse) => {
    return dispatch => {
        dispatch(actGetListUserUnsubsRequest())
        apiAdmin
            .post("QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", idCourse)
            .then((result) => {
                dispatch(actGetListUserUnsubsSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actGetListUserUnsubsFailed(error.response.data))
            })
    }
}

export const actRegisterCourse = (infoRegister, idCourse) => {
    return dispatch => {
        apiAdmin
            .post("QuanLyKhoaHoc/DangKyKhoaHoc", infoRegister)
            .then((result) => {
                alert("Register Success");
                dispatch(actFetchListUserUnsubs(idCourse))
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