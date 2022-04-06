import * as ActionType from "./constants";
import { apiAdmin, groupID } from "utils/apiUtils";
import { actListUserAdmin } from "store/userAdmin/actions";

const actEditUserRequest = () => {
    return {
        type: ActionType.EDIT_USER_REQUEST
    }
}

const actEditUserSuccess = (data) => {
    return {
        type: ActionType.EDIT_USER_REQUEST,
        payload: data
    }
}

const actEditUserFailed = (error) => {
    return {
        type: ActionType.EDIT_USER_REQUEST,
        payload: error
    }
}



export const actEditUserAdmin = (user, history) => {
    return dispatch => {
        dispatch(actEditUserRequest());
        apiAdmin
            .put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user)
            .then((result) => {
                dispatch(actEditUserSuccess(result.data));
                alert("Update Success!");
                history.push("/admin/user-list");
                dispatch(actListUserAdmin())
            })
            .catch((error) => {
                console.log(error);
                dispatch(actEditUserFailed(error.data))
            })
    }
}

export const actGetInfoUserAdmin = (user) => {
    return dispatch => {
        apiAdmin
            .get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${groupID.maNhom}&tuKhoa=${user}`)
            .then((result) => {
                dispatch({
                    type: ActionType.GET_INFO_USER,
                    payload: result.data
                })
            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }
}

