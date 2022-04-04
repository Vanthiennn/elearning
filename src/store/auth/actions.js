import * as ActionType from "./constants";
import { apiAdmin } from "utils/apiUtils";

const actAuthRequest = () => {
    return {
        type: ActionType.AUTH_REQUEST
    }
}

const actAuthSuccess = (data) => {
    return {
        type: ActionType.AUTH_SUCCESS,
        payload: data
    }
}

const actAuthFailed = (error) => {
    return {
        type: ActionType.AUTH_FAILED,
        payload: error
    }
}

export const actAuth = (user, history) => {
    return (dispatch) => {
        dispatch(actAuthRequest());
        apiAdmin
            .post("QuanLyNguoiDung/DangNhap", user)
            .then((result) => {
                if(result.data.maLoaiNguoiDung === "HV"){
                    return Promise.reject({
                        response: {
                            data: "You do not have access!"
                        }
                    })
                }
                localStorage.setItem("UserAdmin", JSON.stringify(result.data));

                history.replace("/admin");
                
                dispatch(actAuthSuccess(result.data.content))
            })
            .catch((error) => {
                console.log(error);
                dispatch(actAuthFailed(error))
            })
    }
}