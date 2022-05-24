import * as ActionType from "./constants";
import { apiAdmin, groupID } from "utils/apiUtils";

const actListUserRequest = () => {
    return {
        type: ActionType.LIST_USER_REQUEST
    }
}

const actListUserSuccess = (data) => {
    return {
        type: ActionType.LIST_USER_SUCCESS,
        payload: data
    }
}

const actListUserFailed = (error) => {
    return {
        type: ActionType.LIST_USER_FAILED,
        payload: error
    }
}

export const actListUserAdmin = () => {
    return (dispatch) => {
        dispatch(actListUserRequest());
        apiAdmin
            .get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${groupID.maNhom}`)
            .then((result) => {
                dispatch(actListUserSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actListUserFailed(error))
            })
    }
}

export const actDeleteUserAdmin = (user, history) => {
    return (dispatch) => {
        apiAdmin
            .delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`)
            .then((result) => {
                alert(`Delete success ${user} !`);
                window.location.reload();
            })
            .catch((error) => {
                alert(error.response.data);
            })
    }
}