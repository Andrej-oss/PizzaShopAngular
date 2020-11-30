import {Pizza} from './Pizza';
import {Ingredient} from './Ingredient';

export interface DefaultPizzaState {
  pizzas: Pizza[];
  ingredients: Ingredient[];
}

export const InitialPizzaState: DefaultPizzaState = {
  pizzas: [],
  ingredients: [],
};

