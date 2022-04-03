import * as ActionType from "./constant";

const initState = {
  detailCourse: [],
  error: null,
  loading: false,
};

const detailCourseReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.GET_DETAIL_REQUEST: {
      state.loading = true;
      state.detailCourse = [];
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_DETAIL_SUCCESS: {
      state.loading = false;
      state.detailCourse = action.payload;
      state.error = null;
      return { ...state };
    }
    case ActionType.GET_DETAIL_FAILED: {
      state.loading = false;
      state.detailCourse = [];
      state.error = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default detailCourseReducer