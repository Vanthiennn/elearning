
import { apiHome } from "utils/apiUtils"
import * as ActionType from "./constant"

export const actAddToCart = (data) => {
    return dispatch =>  {
        dispatch({
            type:ActionType.ADD_TO_CART,
            data
        })
    }
}

export const actDeleteCart = (maKhoaHoc) => {
    return dispatch => [
        dispatch({
            type:ActionType.DELETE_CART,
            maKhoaHoc
        })
    ]
}

export const actRegisterCourse = (listCart,history) => {
    const user = JSON.parse(localStorage.getItem("UserHome"))
    return dispatch => {
        listCart.map(item => {
            return apiHome
                .post("QuanLyKhoaHoc/DangKyKhoaHoc",{maKhoaHoc:item.maKhoaHoc,taiKhoan:user.taiKhoan})
                .then((result) => {
                    console.log(result)
                    dispatch(successRegiterCourse())
                    history.push("/")
                })
                .catch((error) => {
                    console.log(error.response)
                })
        })
    }
}

const successRegiterCourse = () => {
    return {
        type:ActionType.RELOAD_CART
    }
}