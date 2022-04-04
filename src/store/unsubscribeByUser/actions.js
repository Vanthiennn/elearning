import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";

const actGetListCourseRegisteredRequest = () => {
    return {
        type: ActionType.LIST_COURSE_REGISTERED_REQUEST
    }
}

const actGetListCourseRegisteredSuccess = (data) => {
    return {
        type: ActionType.LIST_COURSE_REGISTERED_SUCCESS,
        payload: data
    }
}

const actGetListCourseRegisteredFailed = (error) => {
    return {
        type: ActionType.LIST_COURSE_REGISTERED_FAILED,
        payload: error
    }
}

export const actFetchListCourseRegistered = (account) => {
    return dispatch => {
        dispatch(actGetListCourseRegisteredRequest())
        apiAdmin
            .post("QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", account)
            .then((result) => {
                dispatch(actGetListCourseRegisteredSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actGetListCourseRegisteredFailed(error.response.data))
            })
    }
}

export const actUnsubsCourseAdmin = (infoUnsubs, account) => {
    return dispatch => {
        apiAdmin
            .post("QuanLyKhoaHoc/HuyGhiDanh", infoUnsubs)
            .then((result) => {
                alert("Unsubscibe Success!")
                dispatch(actFetchListCourseRegistered(account))
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