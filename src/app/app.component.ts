import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ThemeObjectService} from './logic/theme-object/theme-object.service';
import {UserService} from "./logic/services/userDao/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pizza-shop';
  darkTheme = 'app-content-dark';
  whiteTheme = 'app-content';

  constructor(public userService: UserService,
              private router: Router,
              public themeSubjectService: ThemeObjectService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    // if (token != null){
    //   this.userService.setToken(token);
    // }
  }

  addIngredient(): void {
    this.router.navigateByUrl('/ingredient_post').then(r => console.log(r));
  }

  addPizza(): void{
    this.router.navigateByUrl('/pizza_post').then(r => console.log(r));
  }
}
