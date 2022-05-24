import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";
import { actListUserAdmin } from "store/userAdmin/actions";

const actAddUserRequest = () => {
    return {
        type: ActionType.ADD_USER_REQUEST
    }
}

const actAddUserSuccess = (data) => {
    return {
        type: ActionType.ADD_USER_SUCCESS,
        payload: data
    }
}

const actAddUserFailed = (error) => {
    return {
        type: ActionType.ADD_USER_FAILED,
        payload: error
    }
}

export const actAddUserAdmin = (formData, history) => {
    return (dispatch) => {
        dispatch(actAddUserRequest())
        apiAdmin
            .post("QuanLyNguoiDung/ThemNguoiDung", formData)
            .then((result) => {
                dispatch(actAddUserSuccess(result));
                alert("Success!");
                history.push("/admin/user-list");
                dispatch(actListUserAdmin())
            })
            .catch((error) => {
                console.log(error.response.data);
                dispatch(actAddUserFailed(error))
            })
    }
}