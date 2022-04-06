import * as ActionType from "./constants";
import { apiHome } from "utils/apiUtils";
import Swal from "sweetalert2";
export const actRegister = (user, history) => {
  return (dispatch) => {
    apiHome
      .post("QuanLyNguoiDung/DangKy", user)
      .then((result) => {
        localStorage.setItem("UserHome", JSON.stringify(result.data));
        dispatch(actRegisterSuccess(result.data),successApi("Register Success").then(()=>{
          history.push("/login")
        }));
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

const successApi = (data) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    html: `<h3 style="color:#a5dc86"><b>SUCCESS!</b></h3><b>${data.toUpperCase()}</b>`,
    showConfirmButton: false,
    timer: 1500,
  });
};
