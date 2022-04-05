import * as ActionType from "./constants";
import { apiHome } from "utils/apiUtils";
import { actLogin } from "store/login/actions";

export const actRegister = (user, history) => {
  return (dispatch) => {
    apiHome
      .post("QuanLyNguoiDung/DangKy", user)
      .then((result) => {
        localStorage.setItem("UserHome", JSON.stringify(result.data));
        dispatch(actRegisterSuccess(result.data));
        history.push("/");
        dispatch(actLogin(user, history));
      })
      .catch((error) => {
        dispatch(actRegisterFail(error));
      });
  };
};

const actRegisterSuccess = (data) => {
  return {
    type: ActionType.REGISTER_SUCCESS,
    payload: data,
  };
};

const actRegisterFail = (error) => {
  return {
    type: ActionType.REGISTER_FAILED,
    payload: error,
  };
};
