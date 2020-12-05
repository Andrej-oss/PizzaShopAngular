import { Injectable } from '@angular/core';
import {UserService} from '../../../services/post.service/user/user.service';
import {UserGetService} from '../../../services/get.services/user/user-get.service';
import { Store } from '@ngrx/store';
import {CartLoad, PrincipalLoad, UsersLoad} from '../../actions-type/userActions';
import {ThemeObjectService} from '../../../theme-object/theme-object.service';
import {CartGetService} from '../../../services/get.services/cart/cart.get.service';
import {CartService} from '../../../services/post.service/cart/cart.service';
import {Cart} from '../../../../components/models/Cart';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from "../../../../components/snack-bar/snack-bar-login/snack-bar.component";


@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  constructor(private userService: UserService,
              private userGetService: UserGetService,
              private cartGetService: CartGetService,
              private store: Store,
              private cartService: CartService,
              private snackBar: MatSnackBar,
              public themeObjectService: ThemeObjectService) { }

   getUsers(): | {}{
    return  this.userGetService.getAllUsers().subscribe( data => {
      return this.store.dispatch(new UsersLoad(data));
    });
   }
   getPrincipal(name: string): | {}{
    return this.userGetService.getUserByName(name).subscribe( data => {
      this.themeObjectService.data.value.userName = data.username;
      this.themeObjectService.data.value.userId = data.id;
      debugger;
      return this.store.dispatch(new PrincipalLoad([data]));
     });
   }
   getAllCart(id): | {}{
    debugger;
    return this.cartGetService.getAllCartsElements(this.themeObjectService.data.value.userId)
      .subscribe(data => {
        this.themeObjectService.data.value.sizeCart = data.length;
        debugger;
        return this.store.dispatch(new CartLoad(data));
      });
   }
  postElementInCart(cart: Cart): | {}{
    return this.cartService.savePizzaInCart(cart)
      .subscribe(data => {
        this.themeObjectService.data.value.message = 'Pizza added to basket';
        this.themeObjectService.data.value.sizeCart = data.length;
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
        });
        return this.store.dispatch(new CartLoad(data));
      });
  }
}
