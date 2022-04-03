import * as ActionType from "./constant"
const initState = {
    infoUser : []
}

const profileUserReducer = (state=initState,action) => {
    switch (action.type) {     
        case ActionType.GET_INFO_USER: {
            state.infoUser = action.payload
            return {...state}
        }
        case ActionType.UPDATE_INFO_USER: {
            state.infoUser = action.payload
            return {...state}
        }
        default: return {...state}   
    }


}

export default profileUserReducer