import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ThemeObjectService} from '../../logic/theme-object/theme-object.service';
import {Observable} from 'rxjs';
import {Cart} from '../models/Cart';
import {select, Store} from '@ngrx/store';
import {selectCart} from '../../logic/store/selectors/UserSelect';
import {Pizza} from '../models/Pizza';
import {AllPizzasSelector} from '../../logic/store/selectors/PizzaSelector';
import {UserService} from '../../logic/services/userDao/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCartOpen: boolean;
  cartElements: Observable<Cart[]> = this.store$.pipe(select(selectCart));
  pizzas: Observable<Pizza[]> = this.store$.pipe(select(AllPizzasSelector));
  constructor(private router: Router,
              public userService: UserService,
              private store$: Store,
              public themeSubjectService: ThemeObjectService) { }

  ngOnInit(): void {
    this.isCartOpen = true;
  }

  onLogin(): void{
    this.router.navigateByUrl('/authenticate').then(data => console.log(data));
  }

  onRegistration(): void{
    this.router.navigateByUrl('/registration').then(data => console.log(data));
  }

  onAdmin(): void{
    this.router.navigateByUrl('/admin').then(data => console.log(data));
  }

  onUserPage(): void{
    this.router.navigateByUrl('/user_page').then(data => console.log(data));
  }

  onDark(): void{
    this.themeSubjectService.data.value.isDarkTheme = ! this.themeSubjectService.data.value.isDarkTheme;
  }

  showCart(): void{
    this.isCartOpen = !this.isCartOpen;
  }

  hideCart(): void{
    this.isCartOpen = !this.isCartOpen;
  }

  onCartPage(): void{
    this.router.navigate(['/cart']).then(data => console.log(data));
  }
}
