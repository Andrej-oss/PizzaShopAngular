import {Pizza} from './Pizza';
import {Ingredient} from './Ingredient';
import {Size} from './Size';

export interface DefaultPizzaState {
  pizzas: Pizza[];
  ingredients: Ingredient[];
  size: Size;
}

export const InitialPizzaState: DefaultPizzaState = {
  pizzas: [],
  ingredients: [],
  size: null,
};

