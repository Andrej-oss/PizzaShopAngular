import {Component, Input, OnInit} from '@angular/core';
import {Cart} from '../../models/Cart';
import {Pizza} from '../../models/Pizza';
import {ThemeObjectService} from "../../../logic/theme-object/theme-object.service";


@Component({
  selector: 'app-pizza-cart-card',
  templateUrl: './pizza-cart-card.component.html',
  styleUrls: ['./pizza-cart-card.component.css']
})
export class PizzaCartCardComponent implements OnInit {
  @Input()
  cartElements: Cart[];
  @Input()
  pizzas: Pizza[];
  totalPrice: number;

  constructor(public themeObjectService: ThemeObjectService) {
  }

  ngOnInit(): void {
    this.totalPrice = 0;
    this.themeObjectService.data.value.totalPrice = 0;
    this.getTotalPrice();
  }
  getTotalPrice(): void{
    this.totalPrice = +this.cartElements.reduce((previousValue, currentValue) => {
    return  previousValue + currentValue.price; }, 0);
    this.themeObjectService.data.value.totalPrice = this.totalPrice;
  }
}