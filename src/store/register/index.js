import * as ActionType from "./constants";

let user = {};
if(localStorage.getItem("UserHome")){
    user = JSON.parse(localStorage.getItem("UserHome"))
}

const initState = {
    data:null,
    error:null,
    userRegister:user
}

const registerReducer = (state=initState,action) =>{
    switch(action.type){
        case ActionType.REGISTER_SUCCESS:{
            state.data = action.payload
            return {...state}
        }

        case ActionType.REGISTER_FAILED:{
            state.error = action.payload
            return {...state}
        }

        default : return {...state}
    }
}

export default registerReducer