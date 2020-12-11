import {Action} from '@ngrx/store';
import {Pizza} from '../../../components/models/Pizza';
import {Ingredient} from '../../../components/models/Ingredient';
import {Size} from '../../../components/models/Size';

export enum PizzaActionType {
  pizzaAllLoaded = '[PIZZA] all loaded',
  pizzaSizeLoaded = '[PIZZA] size loaded',
  pizzaIngredientsLoaded = '[INGREDIENTS] pizza loaded',
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
export class SizePizzaLoad implements Action{
  readonly type = PizzaActionType.pizzaSizeLoaded;

  constructor(public payload: Size) {
  }
}
export type PizzaAction = PizzasLoad
  | IngredientsLoad
  | SizePizzaLoad;
