import * as ActionType from "./constant"
import { apiHome } from "utils/apiUtils"


export const actDetailCateApi = (maDanhMuc) => {
    return (dispatch) => {
        dispatch(actDetailCateRequest)
        apiHome
            .get(`QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP05`)
            .then((result) => {
                if(result.status === 200) {
                    // [temp] Add price
                    let {data} = result
                    data = data.map(i => ({
                        ...i,
                        fee:Math.floor(Math.random() * (Math.floor(100) - Math.ceil(50))) + Math.ceil(50)
                    }))
                    dispatch(actDetailCateSuccess(data))
                }
            })
            .catch((error) => {
                dispatch(actDetailCateFailed(error.response.data))
            })
    }
}


const actDetailCateRequest = () => {
    return {
        type:ActionType.DETAIL_CATEGORY_REQUEST
    }
}

const actDetailCateSuccess = (detailCate) => {
    return {
        type:ActionType.DETAIL_CATEGORY_SUCCESS,
        payload:detailCate
    }
}

const actDetailCateFailed = (error) => {
    return {
        type:ActionType.DETAIL_CATEGORY_FAILED,
        payload:error
    }
}