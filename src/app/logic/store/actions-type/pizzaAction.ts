import {Action} from '@ngrx/store';
import {Pizza} from '../../../components/models/Pizza';
import {Ingredient} from '../../../components/models/Ingredient';

export enum PizzaActionType {
  pizzaAllLoaded = '[PIZZA] all loaded',
  pizzaOneLoaded = '[PIZZA] one loaded',
  pizzaIngredientsLoaded = '[INGREDIENTS] pizza loaded'
}
export class PizzasLoad implements Action{
  readonly type = PizzaActionType.pizzaAllLoaded;

  constructor(public payload: Pizza[]) {
  }
}
export class IngredientsLoad  implements Action{
  readonly type = PizzaActionType.pizzaIngredientsLoaded;

  constructor(public payload: Ingredient[]) {
  }
}
export type PizzaAction = PizzasLoad | IngredientsLoad;
