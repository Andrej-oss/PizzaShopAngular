import {Pizza} from './Pizza';
import {Ingredient} from './Ingredient';
import {Size} from './Size';
import {Rating} from './Rating';

export interface DefaultPizzaState {
  pizzas: Pizza[];
  ingredients: Ingredient[];
  size: Size;
  rating: Rating;
}

export const InitialPizzaState: DefaultPizzaState = {
  pizzas: [],
  ingredients: [],
  size: null,
  rating: null,
};

