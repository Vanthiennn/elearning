import * as ActionType from "./constants";
import { apiHome } from "utils/apiUtils";
import Swal from "sweetalert2";
export const actGetInfoUser = () => {
    return (dispatch) => {
      apiHome
        .post("QuanLyNguoiDung/ThongTinTaiKhoan")
        .then((result) => {
          if (result.status === 200) {
            dispatch(actGetInfoUserSuccess(result.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  
  export const actUpdateInfo = (data) => {
    return (dispatch) => {
      apiHome
        .put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
        .then((result) => {
          dispatch(successApi(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };
  
  const actGetInfoUserSuccess = (data) => {
    return {
      type: ActionType.GET_INFO_USER,
      payload: data,
    };
  };
  
  const successApi = () => {
    return Swal.fire({
      position: "center",
      icon: "success",
      html: `<h3 style="color:#a5dc86"><b>SUCCESS!</b></h3><b>Update Success</b>`,
      showConfirmButton: false,
      timer: 1500,
  })
  }
  // const actUpdateInfoSuccess = (data) => {
  //   return {
  //     type: ActionType.UPDATE_INFO_USER,
  //     payload: data,
  //   };
  // };