import { Component, OnInit } from '@angular/core';
import {UserService} from '../../logic/services/post.service/user/user.service';
import {UserGetService} from '../../logic/services/get.services/user/user-get.service';
import {User} from '../models/User';

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
  user: User;

  constructor(private userService: UserService,
              private userGetService: UserGetService) { }

  ngOnInit(): void {
     this.userGetService.getUserByName(this.userService.getUserName())
       .subscribe(data => this.user = data);
  }

  onBasket(): void{

  }

  onUserUpdate(): void{
    this.isUpdateInfoOpen = !this.isUpdateInfoOpen;
  }
}
