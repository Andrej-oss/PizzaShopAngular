import {InitialPizzaState} from '../../../components/models/InitialPIzzaState';
import {PizzaAction, PizzaActionType} from '../actions-type/pizzaAction';

export const pizzaNode = 'pizzaStore';

export const pizzaReducer = (state = InitialPizzaState, action: PizzaAction) => {
  switch (action.type) {
    case PizzaActionType.pizzaAllLoaded: {
      return{
        ...state,
        pizzas: action.payload
      };
    }
    case PizzaActionType.pizzaIngredientsLoaded: {
      return {
        ...state,
        ingredients: action.payload,
      };
    }
    case PizzaActionType.pizzaSizeLoaded: {
      return {
        ...state,
        size: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
