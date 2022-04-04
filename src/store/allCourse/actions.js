import * as ActionType from "./constants";
import { apiHome } from "utils/apiUtils";
import { sortByAZ, sortByPrice } from "helpers"

export const actAllCourse = (currentPage, pageSize = 8) => {
    return (dispatch) => {
        dispatch(actAllCourseRequest)
        apiHome
        .get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${currentPage}&pageSize=${pageSize}&MaNhom=GP05`)
        .then((result) => {
            if(result.status === 200) {
                // [temp] Add price
                let { items } = result.data
                items = items.map(i => ({
                    ...i,
                    fee:Math.floor(Math.random() * (Math.floor(100) - Math.ceil(50))) + Math.ceil(50)
                }))
                // [temp]
                
                dispatch(actAllCourseSuccess({
                    ...result.data,
                    items
                }))
            }
        })
        .catch((error) => {
            dispatch(actAllCourseFailed(error.response.data))
        })
    }
}

export const applyFilter = (filter, allCourse) => {
    return (dispatch) => {
        let filtered
        switch(filter) {
            case 'price:asc':
                filtered = sortByPrice(allCourse.items);
                break;
            case 'price:desc':
                filtered = sortByPrice(allCourse.items, true);
                break;
            default:
                filtered = sortByAZ(allCourse.items);
    
        }

        dispatch(actAllCourseSuccess({
            ...allCourse,
            items: filtered
        }))
    }
}

const actAllCourseRequest = () => {
    return {
        type:ActionType.RENDER_COURSES_REQUEST
    }
}

const actAllCourseSuccess = (allCourse) => {
    return {
        type:ActionType.RENDER_COURSES_SUCCESS,
        payload:allCourse
    }
}

const actAllCourseFailed = (error) => {
    return {
        type:ActionType.RENDER_COURSES_FAILED,
        payload:error
    }
}