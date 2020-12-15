import { Component, OnInit } from '@angular/core';
import {PizzaService} from '../../../logic/store/actions/pizza/pizza.service';
import {Pizza} from '../../models/Pizza';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AllPizzasSelector} from '../../../logic/store/selectors/PizzaSelector';
import {IngredientService} from '../../../logic/services/post.service/ingredient/ingredient.service';

@Component({
  selector: 'app-pizza-page',
  templateUrl: './pizza-page.component.html',
  styleUrls: ['./pizza-page.component.css']
})
export class PizzaPageComponent implements OnInit {
  pizzas: Pizza[];
  sub: Subscription;
  constructor(private pizzaService: PizzaService,
              private store$: Store) { }

  ngOnInit(): void {
    this.sub = this.store$.pipe(select(AllPizzasSelector)).subscribe(data => this.pizzas = data);
    if (this.pizzas.length === 0) {
      this.pizzaService.getAllPizzas();
      this.pizzaService.getIngredients();
    }
  }

}
