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
        console.log(result)
        dispatch(actUpdateInfoSuccess(result.data),successApi("Success"));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const actUpdateInfoSuccess = (data) => {
  return {
    type:ActionType.UPDATE_INFO_USER,
    payload:data
  }
}

const actGetInfoUserSuccess = (data) => {
  return {
    type: ActionType.GET_INFO_USER,
    payload: data,
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
export const actCancelRegisterCourse = (data,maKhoaHoc) => {
  const user = JSON.parse(localStorage.getItem("UserHome"));
  return (dispatch) => {
      return apiHome
        .post("QuanLyKhoaHoc/HuyGhiDanh", data,user.taiKhoan)
        .then((result) => {
            dispatch(actCancelSuccess(maKhoaHoc),successApi("Cancel Success"));          
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    
  };
};

const actCancelSuccess = (maKhoaHoc) => {
  return {
    type: ActionType.CANCEL_REGISTER_COURSE,
    payload:maKhoaHoc
  };
};
