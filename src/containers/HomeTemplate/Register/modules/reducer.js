import { REGISTER_SUCCESS , REGISTER_FAILED} from "./constant";

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
        case REGISTER_SUCCESS:{
            state.data = action.payload
            return {...state}
        }

        case REGISTER_FAILED:{
            state.error = action.payload
            return {...state}
        }

        default : return {...state}
    }
}

export default registerReducer