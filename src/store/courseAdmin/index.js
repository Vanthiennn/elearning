import * as ActionType from "./constants";

const initialState = {
    loading: false,
    data: null,
    error: null,
    courseCatalog: null,
    // dataSearch: null,
}

const listCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LIST_COURSE_REQUEST:
            state.loading = true;
            state.data = null;
            state.error = null
            return { ...state }

        case ActionType.LIST_COURSE_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.error = null
            return { ...state }

        case ActionType.LIST_COURSE_FAILED:
            state.loading = false;
            state.data = null;
            state.error = action.payload
            return { ...state }
        // case ActionType.SEARCH_COURSE: {
        //     state.dataSearch = action.payload
        //     return { ...state }
        // }
        case ActionType.COURSE_CATALOG: {
            state.courseCatalog = action.payload
            return { ...state }
        }
        default:
            return { ...state }
    }

}

export default listCourseReducer