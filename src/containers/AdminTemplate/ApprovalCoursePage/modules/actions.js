import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";

const actGetListCoursaWaitApprovalRequest = () => {
    return {
        type: ActionType.LIST_COURSE_WAIT_APPROVAL_REQUEST
    }
}

const actGetListCoursaWaitApprovalSuccess = (data) => {
    return {
        type: ActionType.LIST_COURSE_WAIT_APPROVAL_SUCCESS,
        payload: data
    }
}

const actGetListCoursaWaitApprovalFailed = (error) => {
    return {
        type: ActionType.LIST_COURSE_WAIT_APPROVAL_FAILED,
        payload: error
    }
}

export const actFetchListCoursaWaitApproval = (account) => {
    return dispatch => {
        dispatch(actGetListCoursaWaitApprovalRequest())
        apiAdmin
            .post("QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", account)
            .then((result) => {
                dispatch(actGetListCoursaWaitApprovalSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actGetListCoursaWaitApprovalFailed(error.response.data))
            })
    }
}

export const actRegisterCourse = (infoRegister, account) => {
    return dispatch => {
        apiAdmin
            .post("QuanLyKhoaHoc/GhiDanhKhoaHoc", infoRegister)
            .then((result) => {
                alert("Register Success!");
                dispatch(actFetchListCoursaWaitApproval(account))
            })
            .catch((error) => {
                alert(error.response.data)
            })
    }
}

export const actUnsubsCourseAdmin = (infoUnsubs, account) => {
    return dispatch => {
        apiAdmin
            .post("QuanLyKhoaHoc/HuyGhiDanh", infoUnsubs)
            .then((result) => {
                alert("Unsubscibe Success!")
                dispatch(actFetchListCoursaWaitApproval(account))
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