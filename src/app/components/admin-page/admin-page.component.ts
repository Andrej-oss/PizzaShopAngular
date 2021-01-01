import { Component, OnInit } from '@angular/core';
import {UserGetService} from '../../logic/services/get.services/user/user-get.service';
import {UserService} from '../../logic/services/post.service/user/user.service';
import {User} from '../models/User';
import {UserActionsService} from '../../logic/store/actions/user/user-actions.service';
import {select, Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectPrincipal, selectUsers} from '../../logic/store/selectors/UserSelect';

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

  constructor(private userGetService: UserGetService,
              private userService: UserService,
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
    this.isOpenUsersAdministrating = !this.isOpenUsersAdministrating;
    this.isOpenPizzaOptions = false;
    this.isOpenUserUpdate = false;
  }

  onUserUpdate(): void{
    this.isOpenUserUpdate = !this.isOpenUserUpdate;
    this.isOpenUsersAdministrating = false;
    this.isOpenPizzaOptions = false;
  }

  onPizzaUpdate(): void{
    this.isOpenPizzaOptions = !this.isOpenPizzaOptions;
    this.isOpenUserUpdate = false;
    this.isOpenUsersAdministrating = false;
  }
}
