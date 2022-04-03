import * as ActionType from "./constants";

const initState = {
  loading: false,
  data: [],
  error: null,
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.CATEGORY_REQUEST: {
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };
    }

    case ActionType.CATEGORY_SUCCESS: {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };
    }

    case ActionType.CATEGORY_FAILED: {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default categoryReducer;