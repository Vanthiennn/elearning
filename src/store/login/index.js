import * as ActionType from "./constants"

let user = {};
if(localStorage.getItem("UserHome")){
    user = JSON.parse(localStorage.getItem("UserHome"))
}

const initState = {
    loading:false,
    data:null,
    error:null,
    userLogin:user,
}

const loginReducer = (state=initState,action) => {
   
    switch(action.type){
        case ActionType.LOGIN_REQUEST:{
            state.loading = true;
            state.data = null ;
            state.error = null;
            return {...state}
        }

        case ActionType.LOGIN_SUCCESS:{
            state.loading = false ; 
            state.data = action.payload;
            state.error = null ;
            return {...state,userLogin:action.payload}
        }

        case ActionType.LOGIN_FAILED:{
            state.loading = false ; 
            state.data = null ;
            state.error = action.payload ;
            return {...state}
        }
        default: return {...state}
    }
}

export default loginReducer