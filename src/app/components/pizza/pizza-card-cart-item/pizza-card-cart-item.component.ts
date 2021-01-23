import {Component, Input, OnInit} from '@angular/core';
import {Cart} from '../../models/Cart';
import {Pizza} from '../../models/Pizza';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {UserActionsService} from '../../../logic/store/actions/user/user-actions.service';
import {CartService} from '../../../logic/services/cartDao/cart.service';
import {Drink} from '../../models/Drink';


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
  @Input()
  drink: Drink;
  url = 'http://localhost:8080/pizza/image/';
  count: number;
  price: number;
  cart: Cart;
  urlDrink = 'http://localhost:8080/drink/';

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
      debugger;
      if (this.pizza) {
        this.cart = {
          id: this.cartElement.id,
          description: this.cartElement.description,
          pizzaId: this.cartElement.pizzaId,
          price: this.cartElement.price + this.pizza.price,
          amount: this.cartElement.amount + 1,
          size: this.cartElement.size
        };
        this.cartService.addAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        this.price = this.price + this.pizza.price;
        this.themeObjectService.data.value.totalPrice = this.themeObjectService.data.value.totalPrice + this.pizza.price;
      } else if (this.drink) {
        this.cart = {
          id: this.cartElement.id,
          pizzaId: 0,
          description: this.cartElement.description,
          drinkId: this.cartElement.drinkId,
          price: this.cartElement.price + this.drink.price,
          amount: this.cartElement.amount + 1,
        };
        this.cartService.addAmountPizzaCart(this.cartElement.id, this.drink.price).subscribe(data => console.log(data));
        this.price = this.price + this.drink.price;
        this.themeObjectService.data.value.totalPrice = this.themeObjectService.data.value.totalPrice + this.drink.price;

      }
      this.userService.incAmountPizzaCartInStore(this.cartElement.id, this.cart);
      this.count = this.count + 1;
    } catch (e) {
      console.log(e);
    }
  }

  onDec(): void {
    try {
      debugger;
      if (this.pizza) {
        this.cart = {
          id: this.cartElement.id,
          description: this.cartElement.description,
          pizzaId: this.cartElement.pizzaId,
          price: this.cartElement.price - this.pizza.price,
          amount: this.cartElement.amount - 1,
          size: this.cartElement.size
        };
        this.cartService.removeAmountPizzaCart(this.cartElement.id, this.pizza.price).subscribe(data => console.log(data));
        this.price = this.price - this.pizza.price;
        this.themeObjectService.data.value.totalPrice = this.themeObjectService.data.value.totalPrice - this.pizza.price;
      } else if (this.drink) {
        this.cart = {
          id: this.cartElement.id,
          pizzaId: 0,
          description: this.cartElement.description,
          drinkId: this.cartElement.drinkId,
          price: this.cartElement.price - this.drink.price,
          amount: this.cartElement.amount - 1,
        };
        this.cartService.removeAmountPizzaCart(this.cartElement.id, this.drink.price).subscribe(data => console.log(data));
        this.price = this.price - this.drink.price;
        this.themeObjectService.data.value.totalPrice = this.themeObjectService.data.value.totalPrice - this.drink.price;
      }
      this.userService.decAmountPizzaCartInStore(this.cartElement.id, this.cart);
      this.count = this.count - 1;
    } catch (e) {
      console.log(e);
    }
  }
}
