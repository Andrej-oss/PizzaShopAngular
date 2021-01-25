import {Component, Input, OnInit} from '@angular/core';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {select, Store} from '@ngrx/store';
import { Subscription} from 'rxjs';
import {Pizza} from '../../models/Pizza';
import {
  AllPizzasSelector,
  DrinksSelector,
  SnacksSelector
} from '../../../logic/store/selectors/PizzaSelector';
import {Drink} from '../../models/Drink';
import {Snack} from '../../models/Snack';

@Component({
  selector: 'app-purchases-item',
  templateUrl: './purchases-item.component.html',
  styleUrls: ['./purchases-item.component.css']
})
export class PurchasesItemComponent implements OnInit {
  @Input()
  pizzaId: number;
  @Input()
  drinkId: number;
  @Input()
  snackId: number;
  url = 'http://localhost:8080/pizza/image/';
  urlDrink = 'http://localhost:8080/drink/';
  urlSnack = 'http://localhost:8080/snack/';
  pizzas: Pizza[];
  drinks: Drink[];
  snacks: Snack[];
  item: Pizza | Drink | Snack;
  sub: Subscription;
  constructor(public themeObjectService: ThemeObjectService,
              private store$: Store) { }

  ngOnInit(): void {
    this.sub = this.store$.pipe(select(AllPizzasSelector))
      .subscribe(data => this.pizzas = data);
    this.sub = this.store$.pipe(select(DrinksSelector))
      .subscribe(data => this.drinks = data);
    this.sub = this.store$.pipe(select(SnacksSelector))
      .subscribe(data => this.snacks = data);
    this.findItem();
  }
  findItem(): void{
    if (this.pizzaId !== 0){
      this.item = this.pizzas.find(value => value.id === +this.pizzaId);
    }
    else if (this.drinkId !== 0){
      this.item = this.drinks.find(value => value.id === +this.drinkId);
    }
    else if (this.snackId !== 0){
      this.item = this.snacks.find(value => value.id === +this.snackId);
    }
  }
}
