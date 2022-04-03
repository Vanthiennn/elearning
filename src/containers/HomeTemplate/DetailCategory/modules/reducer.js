import * as ActionType from "./constant";

const initState = {
  loading: false,
  detailCate: [],
  error: null,
};

const detailCategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.DETAIL_CATEGORY_REQUEST: {
      state.loading = true;
      state.detailCate = null;
      state.error = null;
      return { ...state };
    }

    case ActionType.DETAIL_CATEGORY_SUCCESS: {
      state.loading = false;
      state.detailCate = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.DETAIL_CATEGORY_FAILED: {
      state.loading = false;
      state.detailCate = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default detailCategoryReducer;
