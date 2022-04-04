import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";

const actGetListUserWaitApprovalRequest = () => {
    return {
        type: ActionType.LIST_WAIT_APPROVAL_REQUEST
    }
}

const actGetListUserWaitApprovalSuccess = (data) => {
    return {
        type: ActionType.LIST_WAIT_APPROVAL_SUCCESS,
        payload: data
    }
}

const actGetListUserWaitApprovalFailed = (error) => {
    return {
        type: ActionType.LIST_WAIT_APPROVAL_FAILED,
        payload: error
    }
}

export const actFetchListUserWaitApproval = (idCourse) => {
    return dispatch => {
        dispatch(actGetListUserWaitApprovalRequest())
        apiAdmin
            .post("QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", idCourse)
            .then((result) => {
                dispatch(actGetListUserWaitApprovalSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actGetListUserWaitApprovalFailed(error.response.data))
            })
    }
}

export const actRegisterCourse = (infoRegister, idCourse) => {
    return dispatch => {
        apiAdmin
            .post("QuanLyKhoaHoc/GhiDanhKhoaHoc", infoRegister)
            .then((result) => {
                alert("Register Success!");
                dispatch(actFetchListUserWaitApproval(idCourse))
            })
            .catch((error) => {
                alert(error.response.data)
            })
    }
}

export const actUnsubsCourseAdmin = (infoUnsubs, idCourse) => {
    return dispatch => {
        apiAdmin
            .post("QuanLyKhoaHoc/HuyGhiDanh", infoUnsubs)
            .then((result) => {
                alert("Unsubscibe Success!")
                dispatch(actFetchListUserWaitApproval(idCourse))
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