import {Component, Input, OnInit} from '@angular/core';
import {Drink} from '../../models/Drink';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {Router} from '@angular/router';
import {DrinkChooseSheetComponent} from '../drink-choose-sheet/drink-choose-sheet.component';
import {Cart} from '../../models/Cart';
import {UserActionsService} from '../../../logic/store/actions/user/user-actions.service';
import {APiURL} from '../../../config/urlConfig';
import {UserService} from "../../../logic/services/userDao/user.service";

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.css']
})
export class DrinkCardComponent implements OnInit {
  @Input()
  drink: Drink;
  cart: Cart;
  url = APiURL.drinkImage;
  constructor(private bottomSheet: MatBottomSheet,
              private userActionsService: UserActionsService,
              private userService: UserService,
              public themeObjectService: ThemeObjectService) { }

  ngOnInit(): void {
  }

  onChooseDrink(id: number): void{
    this.themeObjectService.data.value.idChooseDrink = id;
    this.bottomSheet.open(DrinkChooseSheetComponent);
  }

  onToCartDrink(drink: Drink): void{
    this.cart = {
      description: drink.name,
      drinkId: drink.id,
      amount: 1,
      price: drink.price,
      userId: this.themeObjectService.data.value.userId,
      volume: drink.volume,
    };
    this.themeObjectService.data.value.message = 'Drink added to cart';
    if (this.userService.isAuthenticated()) {
      this.userActionsService.saveElementInCart(this.cart);
    } else {
      this.userService.saveCartInLocalStorage(this.cart);
    }
  }
}
