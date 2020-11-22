import { Component, OnInit } from '@angular/core';
import {UserGetService} from '../../logic/services/get.services/user/user-get.service';
import {UserService} from '../../logic/services/post.service/user/user.service';
import {User} from '../models/User';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  showFiller: boolean;
  users: User[];
  admin: User;
  isAdmin = this.userService.isAdmin();
  isOpenPizzaCreator = false;
  isOpenUsersAdministrating = false;
  step = 0;

  constructor(private userGetService: UserGetService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userGetService.getUserByName(this.userService.getUserName())
      .subscribe(data => this.admin = data);
    this.userGetService.getAllUsers().subscribe(data => this.users = data);
  }

  onPizzaCreate(): void{
    this.isOpenPizzaCreator = !this.isOpenPizzaCreator;
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
  }
}
