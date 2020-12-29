import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Purchase} from '../../models/Purchase';
import {selectPurchases} from '../../../logic/store/selectors/UserSelect';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {UserActionsService} from '../../../logic/store/actions/user/user-actions.service';
import {Cart} from '../../models/Cart';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchases$: Observable<Purchase[]> = this.store$.pipe(select(selectPurchases));
  displayedColumns: string[] = ['position', 'name', 'description', 'size', 'price', 'date', 'option'];
  blackTheme = 'purchase-item-black';
  whiteTheme = 'purchase-item';
  black = 'background-color: black';
  white = 'background-color: white';
  blackColor = 'color: white';
  whiteColor = 'color: black';
  cart: Cart;
  constructor(private store$: Store,
              private userService: UserActionsService,
              public themeObjectService: ThemeObjectService) {
  }

  ngOnInit(): void {
  }

  onDelete(id: any): void {
    this.userService.deletePurchaseInStore(id);
  }

  saveInCart(id: number, descriptionPurchase: string, name: string): void {
    this.cart = {
      description: descriptionPurchase,
      pizzaId: id,
      amount: 1,
      price: this.themeObjectService.data.value.price,
      userId: this.themeObjectService.data.value.userId,
      size: name,
    };
    this.themeObjectService.data.value.message = 'Pizza added to cart';
    this.userService.saveElementInCart(this.cart);
  }


}
