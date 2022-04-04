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

export const actListUserAdmin = (pageNumber) => {
    return (dispatch) => {
        dispatch(actListUserRequest());
        apiAdmin
            .get(`QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=${groupID.maNhom}&page=${pageNumber}&pageSize=10`)
            .then((result) => {
                dispatch(actListUserSuccess(result.data))
            })
            .catch((error) => {
                dispatch(actListUserFailed(error))
            })
    }
}

export const actDeleteUserAdmin = (user) => {
    return (dispatch) => {
        apiAdmin
            .delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`)
            .then((result) => {
                alert(`Delete success ${user} !`);
                
                dispatch(actListUserAdmin());
            })
            .catch((error) => {
                alert(error.response.data);
                dispatch(actListUserAdmin())
            })
    }
}