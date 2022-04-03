import * as ActionType from "./constant"

let user = {};
if(localStorage.getItem("UserHome")){
    user = JSON.parse(localStorage.getItem("UserHome"))
}

const initState = {
    loading:false,
    data:null,
    error:null,
    userLogin:user,
    infoUser:{}
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

        case ActionType.GET_INFO_USER:{
            state.infoUser = action.payload
            return {...state}
        }


        default: return {...state}
    }
}

export default loginReducer