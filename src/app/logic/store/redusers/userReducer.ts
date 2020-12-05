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
    default: {
      return state;
    }
  }
};
