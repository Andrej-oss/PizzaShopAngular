import {Pizza} from './Pizza';
import {Ingredient} from './Ingredient';
import {Size} from './Size';
import {Rating} from './Rating';
import {Comment} from "./Comment";

export interface DefaultPizzaState {
  pizzas: Pizza[];
  ingredients: Ingredient[];
  size: Size;
  rating: Rating;
  comments: Comment[];
}

export const InitialPizzaState: DefaultPizzaState = {
  pizzas: [],
  ingredients: [],
  size: null,
  rating: null,
  comments: [],
};

