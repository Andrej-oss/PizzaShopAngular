import {Component, Input, OnInit, Output} from '@angular/core';
import {Purchase} from '../../models/Purchase';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Pizza} from '../../models/Pizza';
import {AllPizzasSelector, DrinksSelector, PizzaSelector} from '../../../logic/store/selectors/PizzaSelector';
import {Drink} from '../../models/Drink';

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
  url = 'http://localhost:8080/pizza/image/';
  urlDrink = 'http://localhost:8080/drink/';
  pizzas: Pizza[];
  drinks: Drink[];
  item: Pizza | Drink;
  sub: Subscription;
  constructor(public themeObjectService: ThemeObjectService,
              private store$: Store) { }

  ngOnInit(): void {
    this.sub = this.store$.pipe(select(AllPizzasSelector))
      .subscribe(data => this.pizzas = data);
    this.sub = this.store$.pipe(select(DrinksSelector))
      .subscribe(data => this.drinks = data);
    this.findItem();
    debugger;
  }
  findItem(): void{
    if (this.pizzaId !== 0){
      this.item = this.pizzas.find(value => value.id === +this.pizzaId);
    }
    else if (this.drinkId !== 0){
      this.item = this.drinks.find(value => value.id === +this.drinkId);
    }
    console.log(this.item);
  }
}
