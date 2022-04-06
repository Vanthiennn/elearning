import * as actionTypes from './constants'
/**
 * Cart module
 * 
 * - Actions:
 *      - Update cart
 *      - Reload cart
 * 
 * - State:
 *      - isCartLoading
 *      - cartItems
 */

const inititalState = {
    isCartLoading: false,
    cartItems: [],
    totalQuantity: 0
}

const cartReducer = ( state = inititalState, action ) => {
  switch( action.type ) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isCartLoading: !state.isCartLoading
      }
    case actionTypes.UPDATE_CART:
      localStorage.setItem( 'cart/cartItems', JSON.stringify( action.payload ) )
      let totalQuantity = 0
      action.payload.map(i => totalQuantity += i.qty)
      return {
        ...state,
        cartItems: action.payload,
        totalQuantity
      }
    default:
      return {...state}
  }
}

export default cartReducer