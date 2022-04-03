import * as ActionType from "./constants"

const initState = {
    loading:false,
    listCourses : [],
    error:null,
}

const listCoursesReducer = (state = initState , action) => {
    switch (action.type) {
        case ActionType.RENDER_LIST_COURSES_REQUEST:{
            state.loading = true ;
            state.listCourses = [] ;
            state.error = null ; 
            return {...state}
        }
        case ActionType.RENDER_LIST_COURSES_SUCCESS:{
            state.loading = false ; 
            state.listCourses = action.payload ; 
            state.error = null ; 
            return {...state}
        }
        case ActionType.RENDER_LIST_COURSES_FAILED:{
            state.loading = false ; 
            state.listCourses = null ; 
            state.error = action.payload ;
            return {...state}
        }
          
        default: return {...state}
    }
}

export default listCoursesReducer