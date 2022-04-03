import { REGISTER_FAILED, REGISTER_SUCCESS } from "./constant";
import { actLogin } from "containers/HomeTemplate/Login/modules/actions";
import { apiHome } from "utils/apiUtils";

export const actRegister = (user,history) => {
    return (dispatch) => {
        apiHome
            .post("QuanLyNguoiDung/DangKy",user)
            .then((result)=>{
                console.log(result.data)
                localStorage.setItem("UserHome",JSON.stringify(result.data));
                dispatch(actRegisterSuccess(result.data))
                history.push("/")
                dispatch(actLogin(user,history))
            })
            .catch((error)=>{
                dispatch(actRegisterFail(error))
            })
    }
}

const actRegisterSuccess = (data) => {
    return {
        type:REGISTER_SUCCESS,
        payload:data
    }
}

const actRegisterFail = (error) => {
    return {
        type:REGISTER_FAILED,
        payload:error
    }
}