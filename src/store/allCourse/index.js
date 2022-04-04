import * as ActionType from "./constants"

const initState = {
    loading:false,
    allCourse: {
        totalPages: 0,
        totalCount: 0,
        items: []
    },
    error:null
}

const allCourseReducer = (state = initState , action) => {
    switch (action.type) {
        case ActionType.RENDER_COURSES_REQUEST: {
            state.loading = true ; 
            state.allCourse = null ; 
            state.error = null ;
            return {...state}
        }
        case ActionType.RENDER_COURSES_SUCCESS: {
            state.loading = false ; 
            state.allCourse = action.payload ; 
            state.error = null ;
            return {...state}
        }
        case ActionType.RENDER_COURSES_FAILED: {
            state.loading = false ; 
            state.allCourse = null ; 
            state.error = action.payload ;
            return {...state}
        }
            
    
        default: return {...state}
    }
}

export default allCourseReducer