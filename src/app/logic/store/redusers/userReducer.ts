import {InitialUserState} from '../../../components/models/InitialUserState';
import {UserActions, UserActionsTypes} from '../actions-type/userActions';



export const userNode = 'userStore';
export const userReducer = (state = InitialUserState, action: UserActions) => {
  switch (action.type) {
    case UserActionsTypes.loadedUsers: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case UserActionsTypes.loadedPrincipal: {
      return {
        ...state,
        principal: action.payload[0]
      };
    }
    case UserActionsTypes.loadedCart: {
      return {
        ...state,
        cart: action.payload,
      };
    }
    case UserActionsTypes.incrementAmountPizzaCart: {
      const { cart } = state;
      const { id, price} = action.payload;
      const cart1 = cart.find(value => value.id === id);
      const newCart = [...cart];
      debugger;
      Object.defineProperty(newCart, 'amount', {value: cart1.amount + 1} );
      Object.defineProperty(newCart, 'price', {value: cart1.price + price});
      return {
        ...state,
        cart: newCart,
      };
    }
    case UserActionsTypes.decrementAmountPizzaCart: {
      const { cart } = state;
      const { id, price} = action.payload;
      const cart1 = cart.find(value => value.id === id);
      const newCart = [...cart];
      Object.defineProperty(newCart, 'amount', {value: cart1.amount - 1} );
      Object.defineProperty(newCart, 'price', {value: cart1.price - price});
      return {
        ...state,
        cart: newCart,
      };
    }
    case UserActionsTypes.deletePizzaCart: {
      const { cart } = state;
      const cartFind = cart.findIndex(value => value.id === action.payload.id);
      debugger;
      const newCart = [...cart];
      newCart.splice(cartFind, 1);
      return {
        ...state,
        cart: newCart
      };
    }
    default: {
      return state;
    }
  }
};
