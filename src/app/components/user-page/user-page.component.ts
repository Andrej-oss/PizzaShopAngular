import { Component, OnInit } from '@angular/core';
import {UserService} from '../../logic/services/post.service/user/user.service';
import {User} from '../models/User';
import {UserActionsService} from '../../logic/store/actions/user/user-actions.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectPrincipal} from '../../logic/store/selectors/UserSelect';
import {ThemeObjectService} from '../../logic/theme-object/theme-object.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  step = 0;
  isCartOpen = false;
  isUpdateInfoOpen = false;
  isPurchasesOpen = false;
  // @ts-ignore
  user: Observable<User> = this.store$.pipe(select(selectPrincipal));

  constructor(private userService: UserService,
              private userActionsService: UserActionsService,
              private store$: Store,
              private themeObjectService: ThemeObjectService) { }

  ngOnInit(): void {
     // this.userGetService.getUserByName(this.userService.getUserName())
     //   .subscribe(data => this.user = data);
     this.userActionsService.getPrincipal(this.userService.getUserName());
     this.userActionsService.getPurchasesByUser(this.themeObjectService.data.value.userId);
  }

  onBasket(): void{
    this.isCartOpen = !this.isCartOpen;
    this.isUpdateInfoOpen = false;
    this.isPurchasesOpen = false;
  }

  onUserUpdate(): void{
    this.isUpdateInfoOpen = !this.isUpdateInfoOpen;
    this.isCartOpen = false;
    this.isPurchasesOpen = false;
  }

  onPurchase(): void{
    this.isPurchasesOpen = !this.isPurchasesOpen;
    this.isCartOpen = false;
    this.isUpdateInfoOpen = false;
  }
}
