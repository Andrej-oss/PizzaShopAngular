import { Injectable } from '@angular/core';
import {PizzaGetService} from '../../../services/get.services/pizza/pizza.get.service';
import {Store} from '@ngrx/store';
import {
  IngredientsLoad,
  PizzasLoad,
  SizePizzaLoad
} from '../../actions-type/pizzaAction';
import {IngredientGetService} from '../../../services/get.services/ingredient/ingredient.get.service';
import {SizeService} from '../../../services/get.services/size/size.service';
import {ThemeObjectService} from '../../../theme-object/theme-object.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private pizzaGetService: PizzaGetService,
              private ingredientGetService: IngredientGetService,
              private sizeService: SizeService,
              private themeService: ThemeObjectService,
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
  getSizePizza(id: number, name: string): | {}{
    return this.sizeService.getPizzaSize(id, name)
      .subscribe(data => {
        this.themeService.data.value.price = data.price;
        this.store.dispatch(new SizePizzaLoad(data));
      });
  }
}
