import {Component, Input, OnInit} from '@angular/core';
import {Cart} from '../../models/Cart';
import {Pizza} from '../../models/Pizza';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {UserActionsService} from '../../../logic/store/actions/user/user-actions.service';
import {CartService} from '../../../logic/services/cartDao/cart.service';


@Component({
  selector: 'app-pizza-card-cart-item',
  templateUrl: './pizza-card-cart-item.component.html',
  styleUrls: ['./pizza-card-cart-item.component.css']
})
export class PizzaCardCartItemComponent implements OnInit {
  @Input()
  cartElement: Cart;
  @Input()
  pizza: Pizza;
  @Input()
  totalPrice: number;
  url = 'http://localhost:8080/pizza/image/';
  count: number;
  price: number;
  cart: Cart;

  constructor(private themeObjectService: ThemeObjectService,
              private userService: UserActionsService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.cartElement.amount !== null ? this.count = this.cartElement.amount : this.count = 1;
    this.price = this.cartElement.price;
  }

  onInc(): void {
    try {
      this.cart = {
        id: this.cartElement.id,
        description: this.cartElement.description,
        pizzaId: this.cartElement.pizzaId,
        price: this.cartElement.price + this.pizza.price,
        amount: this.cartElement.amount + 1,
        size: this.cartElement.size
      };
      debugger;
      this.cartService.addAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
      this.userService.incAmountPizzaCartInStore(this.cartElement.id, this.cart);
      this.count = this.count + 1;
      this.price = this.price + this.pizza.price;
      this.themeObjectService.data.value.totalPrice = this.themeObjectService.data.value.totalPrice + this.pizza.price;
    } catch (e) {
      console.log(e);
    }
  }

  onDec(): void {
    this.cart = {
      id: this.cartElement.id,
      description: this.cartElement.description,
      pizzaId: this.cartElement.pizzaId,
      price: this.cartElement.price - this.pizza.price,
      amount: this.cartElement.amount - 1,
      size: this.cartElement.size
    };
    this.cartService.removeAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
    this.userService.decAmountPizzaCartInStore(this.cartElement.id, this.cart);
    this.count = this.count - 1;
    this.price = this.price - this.pizza.price;
    this.themeObjectService.data.value.totalPrice = this.themeObjectService.data.value.totalPrice - this.pizza.price;
  }

  onDelete(id: number): void {
    debugger;
    this.cartService.deleteCart(id).subscribe(data => console.log(data));
    this.userService.deletePizzaCartInStore(id);
    this.themeObjectService.data.value.totalPrice = this.themeObjectService.data.value.totalPrice - this.cartElement.price;
  }
}
