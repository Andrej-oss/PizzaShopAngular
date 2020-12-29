import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../../models/Purchase';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Pizza} from '../../models/Pizza';
import {AllPizzasSelector, PizzaSelector} from '../../../logic/store/selectors/PizzaSelector';

@Component({
  selector: 'app-purchases-item',
  templateUrl: './purchases-item.component.html',
  styleUrls: ['./purchases-item.component.css']
})
export class PurchasesItemComponent implements OnInit {
  @Input()
  pizzaId: number;
  url = 'http://localhost:8080/pizza/image/';
  pizzas: Pizza[];
  item: Pizza;
  sub: Subscription;
  constructor(public themeObjectService: ThemeObjectService,
              private store$: Store) { }

  ngOnInit(): void {
    this.sub = this.store$.pipe(select(AllPizzasSelector))
      .subscribe(data => this.pizzas = data);
    this.findItem();
    debugger;
  }
  findItem(): void{
    if (this.pizzaId){
      this.item = this.pizzas.find(value => value.id === +this.pizzaId);
    }
  }
}
