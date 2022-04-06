import { apiHome } from 'utils/apiUtils'
import * as actionTypes from './constants'
import Swal from "sweetalert2";
const getCartItems = () => {
    return JSON.parse(localStorage.getItem('cart/cartItems')) || []
}

export const addToCart = ( item, qty = 1 ) => {
    return dispatch => {
        if( !item.maKhoaHoc ) {
            return Swal.fire({
                position: "center",
                icon: "error",
                html: `<h3 style="color:#f27474"><b>SUCCESS!</b></h3><b>This course may be wrong , please choice another course. Thank you</b>`,
                showConfirmButton: false,
                timer: 1500,
              })
        }
        const items = getCartItems()
        const selected = items.find( i => i.maKhoaHoc === item.maKhoaHoc )

        if( selected ) {
            items.splice( items.indexOf( selected ), 1 )
            item.qty = selected.qty + qty
        } else {
            item.qty = qty
        }
        items.push( item )
        dispatch( {
            type: actionTypes.UPDATE_CART,
            payload: items
        } )
    }
}

export const removeFromCart = ( item ) => {
    return dispatch => {
        const items = getCartItems()
        const selected = items.find( i => i.maKhoaHoc === item.maKhoaHoc )

        if( selected ) {
            items.splice( items.indexOf( selected ), 1 )
        }

    
        dispatch( {
            type: actionTypes.UPDATE_CART,
            payload: items
        } )
    }
}

export const reloadCart = () => {
    return dispatch => {
        const items = getCartItems()
        dispatch( {
            type: actionTypes.UPDATE_CART,
            payload: items
        } )
    }
}

export const emptyCart = (cartItems,history) => {
    const user = JSON.parse(localStorage.getItem("UserHome"));
    return dispatch => {
        cartItems.map(item => {
            return apiHome
            .post("QuanLyKhoaHoc/DangKyKhoaHoc", {
                maKhoaHoc: item.maKhoaHoc,
                taiKhoan: user.taiKhoan,
            })
            .then(() =>{
                dispatch( {
                    type: actionTypes.UPDATE_CART,
                    payload: []
                },successApi("Register Success").then(() =>{
                    history.push("/profile")
                }))
            })
            .catch(error => {
                console.log(error.response)
                failedRegister("Your course already register")
            })
        })
       
    }
}

const successApi = (data) => {
    return Swal.fire({
      position: "center",
      icon: "success",
      html: `<h3 style="color:#a5dc86"><b>SUCCESS!</b></h3><b>${data.toUpperCase()}</b>`,
      showConfirmButton: false,
      timer: 1500,
    })
};
const failedRegister = (data) => {
    return Swal.fire({
        position: "center",
        icon: "error",
        html: `<h3 style="color:#f27474"><b>SUCCESS!</b></h3><b>${data.toUpperCase()}</b>`,
        showConfirmButton: false,
        timer: 1500,
      })
}