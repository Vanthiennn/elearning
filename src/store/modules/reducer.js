import * as ActionType from "./constants"

const inititalState = {
    loading: false,
    data: null,
    error: null,
}

const addCourseReducer = (state = inititalState, action) => {
    switch (action.type) {
        case ActionType.ADD_COURSE_REQUEST:
            state.loading = true;
            state.data = null;
            state.error = null
            return { ...state };

        case ActionType.ADD_COURSE_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.error = null
            return { ...state };

        case ActionType.ADD_COURSE_FAILED:
            state.loading = false;
            state.data = null;
            state.error = action.payload
            return { ...state };
        default:
            return { ...state };
    }
}

export default addCourseReducer