import { Component, OnInit } from '@angular/core';
import {UserService} from '../../logic/services/post.service/user/user.service';
import {UserGetService} from '../../logic/services/get.services/user/user-get.service';
import {User} from '../models/User';
import {UserActionsService} from '../../logic/store/actions/user/user-actions.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectPrincipal} from '../../logic/store/selectors/UserSelect';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  step = 0;
  isBasketOpen = false;
  isUpdateInfoOpen = false;
  isPurchasesOpen = false;
  // @ts-ignore
  user: Observable<User> = this.store$.pipe(select(selectPrincipal));

  constructor(private userService: UserService,
              private userActionsService: UserActionsService,
              private store$: Store,
              private userGetService: UserGetService) { }

  ngOnInit(): void {
     // this.userGetService.getUserByName(this.userService.getUserName())
     //   .subscribe(data => this.user = data);
     this.userActionsService.getPrincipal(this.userService.getUserName());

  }

  onBasket(): void{

  }

  onUserUpdate(): void{
    this.isUpdateInfoOpen = !this.isUpdateInfoOpen;
  }
}
