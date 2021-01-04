import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {UserActionsService} from '../../logic/store/actions/user/user-actions.service';
import {select, Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectPrincipal, selectUsers} from '../../logic/store/selectors/UserSelect';
import {UserService} from '../../logic/services/userDao/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users: Observable<User[]> = this.store$.pipe(select(selectUsers));
  admin: Observable<any> = this.store$.pipe(select(selectPrincipal));
  isAdmin = this.userService.isAdmin();
  isOpenPizzaCreator = false;
  isOpenUsersAdministrating = false;
  isOpenUserUpdate = false;
  step = 0;
  isOpenPizzaOptions: boolean;
  isOpenIngredientUpdate: boolean;
  isOpenIngredientCreator: boolean;
  constructor(private userService: UserService,
              private userActionsService: UserActionsService,
              private store$: Store) { }

  ngOnInit(): void {
    this.userActionsService.getUsers();
    this.userActionsService.getPrincipal(this.userService.getUserName());
  }

  onPizzaCreate(): void{
    this.isOpenPizzaCreator = !this.isOpenPizzaCreator;
  }
  setStep(index: number): void{
    this.step = index;
  }

  nextStep(): void{
    this.step++;
  }

  prevStep(): void{
    this.step--;
  }

  onUsersAdmin(): void{
    debugger;
    this.isOpenUsersAdministrating = !this.isOpenUsersAdministrating;
    this.isOpenPizzaOptions = false;
    this.isOpenUserUpdate = false;
    this.isOpenIngredientUpdate = false;
  }

  onUserUpdate(): void{
    this.isOpenUserUpdate = !this.isOpenUserUpdate;
    this.isOpenUsersAdministrating = false;
    this.isOpenPizzaOptions = false;
    this.isOpenIngredientUpdate = false;
  }

  onPizzaUpdate(): void{
    this.isOpenPizzaOptions = !this.isOpenPizzaOptions;
    this.isOpenUserUpdate = false;
    this.isOpenUsersAdministrating = false;
    this.isOpenIngredientUpdate = false;
  }

  onIngredientPage(): void{
    this.isOpenIngredientUpdate = !this.isOpenIngredientUpdate;
    this.isOpenUserUpdate = false;
    this.isOpenPizzaOptions = false;
    this.isOpenUsersAdministrating = false;
  }

  onOpenIngredientCreator(): void{
    this.isOpenIngredientCreator = !this.isOpenIngredientCreator;
  }

  onAllPurchases(): void{

  }
}
