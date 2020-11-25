import { Component, OnInit } from '@angular/core';
import {UserGetService} from '../../logic/services/get.services/user/user-get.service';
import {UserService} from '../../logic/services/post.service/user/user.service';
import {User} from '../models/User';
import {UserActionsService} from '../../logic/store/actions/user-actions.service';
import {select, Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectPrincipal, selectUsers} from '../../logic/store/selectors/UserSelect';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  showFiller: boolean;
  users: Observable<User[]> = this.store$.pipe(select(selectUsers));
  admin: Observable<User> = this.store$.pipe(select(selectPrincipal));
  isAdmin = this.userService.isAdmin();
  isOpenPizzaCreator = false;
  isOpenUsersAdministrating = false;
  isOpenUserUpdate = false;
  step = 0;

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
    this.isOpenUserUpdate = false;
    this.isOpenUsersAdministrating = false;
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onUsersAdmin(): void{
    this.isOpenUsersAdministrating = !this.isOpenUsersAdministrating;
    this.isOpenPizzaCreator = false;
    this.isOpenUserUpdate = false;
  }

  onUserUpdate(): void{
    this.isOpenUserUpdate = !this.isOpenUserUpdate;
    this.isOpenUsersAdministrating = false;
    this.isOpenPizzaCreator = false;
  }
}
