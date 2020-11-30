import { Component, OnInit } from '@angular/core';
import {PizzaService} from '../../../logic/store/actions/pizza/pizza.service';
import {Pizza} from '../../models/Pizza';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AllPizzasSelector} from '../../../logic/store/selectors/PizzaSelector';
import {IngredientService} from '../../../logic/services/post.service/ingredient/ingredient.service';

@Component({
  selector: 'app-pizza-page',
  templateUrl: './pizza-page.component.html',
  styleUrls: ['./pizza-page.component.css']
})
export class PizzaPageComponent implements OnInit {
  pizzas: Observable<Pizza[]> = this.store$.pipe(select(AllPizzasSelector));

  constructor(private pizzaService: PizzaService,
              private store$: Store) { }

  ngOnInit(): void {
    this.pizzaService.getAllPizzas();
    this.pizzaService.getIngredients();
  }

}
