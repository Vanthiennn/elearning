import * as ActionType from "./constants";
const initState = {
  infoUser: [],
  updateInfo : []
};

const profileUserReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.GET_INFO_USER: {
      state.infoUser = action.payload;
      return { ...state };
    } 
    case ActionType.UPDATE_INFO_USER: {
      state.updateInfo = action.payload;
      return { ...state };
    } 
    case ActionType.CANCEL_REGISTER_COURSE:{
      let infoUser = {...state.infoUser}
      let index = infoUser.chiTietKhoaHocGhiDanh.findIndex(item => {
        return item.maKhoaHoc === action.payload
      })
      infoUser.chiTietKhoaHocGhiDanh.splice(index,1)
      state.infoUser = infoUser
      return {...state}
    }
    default:
      return { ...state };
  }
};

export default profileUserReducer;
