import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CartLoad,
  PrincipalLoad,
  UsersLoad,
  IncAmountPizzaCart,
  DecAmountPizzaCart,
  DeletePizzaCart, PurchasesByUserLoad, DeletePurchase, CommentUsersLoad
} from '../../actions-type/userActions';
import {ThemeObjectService} from '../../../theme-object/theme-object.service';
import {Cart} from '../../../../components/models/Cart';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../../../../components/snack-bar/snack-bar-login/snack-bar.component';
import {PurchaseService} from '../../../services/purchaseDao/purchase.service';
import {CartService} from '../../../services/cartDao/cart.service';
import {CommentService} from '../../../services/commentDao/comment.service';
import {UserService} from '../../../services/userDao/user.service';



@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  constructor(private userService: UserService,
              private purchaseService: PurchaseService,
              private store: Store,
              private commentService: CommentService,
              private cartService: CartService,
              private snackBar: MatSnackBar,
              public themeObjectService: ThemeObjectService) { }

   getUsers(): | {}{
    return  this.userService.getAllUsers().subscribe( data => {
      return this.store.dispatch(new UsersLoad(data));
    });
   }
   getPrincipal(name: string): | {}{
    return this.userService.getUserByName(name).subscribe( data => {
      this.themeObjectService.data.value.userName = data.username;
      this.themeObjectService.data.value.userId = data.id;
      debugger;
      return this.store.dispatch(new PrincipalLoad(data));
     });
   }
   getAllCart(id): | {}{
    return this.cartService.getAllCartsElements(this.themeObjectService.data.value.userId)
      .subscribe(data => {
        this.themeObjectService.data.value.sizeCart = data.length;
        return this.store.dispatch(new CartLoad(data));
      });
   }
   getUsersComments(name: string): | {}{
    return this.commentService.getCommentsByUserId(name)
      .subscribe(data => this.store.dispatch(new CommentUsersLoad(data)));
   }
  saveElementInCart(cart: Cart): | {}{
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
  incAmountPizzaCartInStore(id: number, cart1: Cart): | void{
    return this.store.dispatch(new IncAmountPizzaCart({id, cart1}));
  }
  decAmountPizzaCartInStore(id: number, cart1: Cart): void{
    this.store.dispatch(new DecAmountPizzaCart({id, cart1}));
  }
  deletePizzaCartInStore(id: number): void{
    this.store.dispatch(new DeletePizzaCart({id}));
  }
  getPurchasesByUser(id: number): | {}{
    return this.purchaseService.getPurchasesByUser(id)
      .subscribe(data => this.store.dispatch(new PurchasesByUserLoad(data)));
  }
  getAllPurchases(page: number, sort: string, type: string): | {}{
    return this.purchaseService.getAllPurchases(page, sort, type)
      .subscribe(data => this.store.dispatch(new PurchasesByUserLoad(data)));
  }
  deletePurchaseInStore(id: number): |{}{
    return this.purchaseService.deletePurchase(id)
      .subscribe(data => {
        if (data === true){
          this.store.dispatch(new DeletePurchase({id}));
        }
      });
  }
}
