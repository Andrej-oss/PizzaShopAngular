import { Component, OnInit } from '@angular/core';
import {Pizza} from '../../models/Pizza';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {AllPizzasSelector} from '../../../logic/store/selectors/PizzaSelector';
import {PizzaActionService} from '../../../logic/store/actions/pizza/pizza-action.service';
import {Avatar} from '../../models/Avatar';
import {selectAllAvatars} from '../../../logic/store/selectors/UserSelect';
import {UserActionsService} from '../../../logic/store/actions/user/user-actions.service';

@Component({
  selector: 'app-pizza-page',
  templateUrl: './pizza-page.component.html',
  styleUrls: ['./pizza-page.component.css']
})
export class PizzaPageComponent implements OnInit {
  pizzas: Pizza[];
  sub: Subscription;
  avatars: Avatar[];
  constructor(private pizzaActionService: PizzaActionService,
              private userService: UserActionsService,
              private store$: Store) { }

  ngOnInit(): void {
    this.sub = this.store$.pipe(select(AllPizzasSelector)).subscribe(data => this.pizzas = data);
    this.sub = this.store$.pipe(select(selectAllAvatars)).subscribe(data => this.avatars = data);
    if (this.pizzas.length === 0) {
      this.pizzaActionService.getAllPizzas();
      this.pizzaActionService.getIngredients();
    }
    if (!this.avatars.length){
      this.userService.getAllAvatars();
    }
  }

}
