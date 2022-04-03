import * as ActionType from "./constant";
import { apiHome } from "utils/apiUtils";

export const actCategoryApi = () => {
    return (dispatch) => {
        dispatch(actCategoryRequest());
        apiHome
            .get("QuanLyKhoaHoc/LayDanhMucKhoaHoc")
            .then((result)=>{
                dispatch(actCategorySuccess(result.data))
            })
            .catch((error)=>{
                dispatch(actCategoryFailed(error))
            })
    }
};

const actCategoryRequest = () => {
  return  {
    type: ActionType.CATEGORY_REQUEST,
  };
};

const actCategorySuccess = (data) => {
    return {
        type:ActionType.CATEGORY_SUCCESS,
        payload:data,
    }
};

const actCategoryFailed = (error) => {
    return {
        type:ActionType.CATEGORY_FAILED,
        payload:error
    }
};
