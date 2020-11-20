import {Component, OnInit} from '@angular/core';
import {UserService} from './logic/services/post.service/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pizza-shop';

  constructor(public userService: UserService, private router: Router) {
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
