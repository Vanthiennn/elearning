import * as ActionType from "./constants";
import { apiHome } from "utils/apiUtils";


export const actLogin = (user, history) => {
    return (dispatch) => {
      dispatch(actLoginRequest());
      apiHome
        .post("QuanLyNguoiDung/DangNhap", user)
        .then((result) => {
          localStorage.setItem("UserHome", JSON.stringify(result.data));
          history.push("/");
          dispatch(actLoginSuccess(result.data));
        })
        .catch((error) => {
          dispatch(actLoginFailed(error));
        });
    };
  };
  
  const actLoginRequest = () => {
    return {
      type: ActionType.LOGIN_REQUEST,
    };
  };
  
  const actLoginSuccess = (data) => {
    return {
      type: ActionType.LOGIN_SUCCESS,
      payload: data,
    };
  };
  
  const actLoginFailed = (error) => {
    return {
      type: ActionType.LOGIN_FAILED,
      payload: error,
    };
  };
  