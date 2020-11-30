import { Injectable } from '@angular/core';
import {PizzaGetService} from '../../../services/get.services/pizza/pizza.get.service';
import {Store} from '@ngrx/store';
import {IngredientsLoad, PizzasLoad} from '../../actions-type/pizzaAction';
import {IngredientService} from "../../../services/post.service/ingredient/ingredient.service";
import {IngredientGetService} from "../../../services/get.services/ingredient/ingredient.get.service";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private pizzaGetService: PizzaGetService,
              private ingredientGetService: IngredientGetService,
              private store: Store) { }
  getAllPizzas(): | {}{
    return this.pizzaGetService.getAllPizza()
      .subscribe(data => {
        this.store.dispatch(new PizzasLoad(data));
      });
  }
  getIngredients(): | {}{
    return this.ingredientGetService.getAllIngredients()
      .subscribe(data => {
        this.store.dispatch(new IngredientsLoad(data));
      });
  }
}
