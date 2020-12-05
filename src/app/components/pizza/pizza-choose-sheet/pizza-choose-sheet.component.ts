import {Component, Input, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Pizza} from '../../models/Pizza';
import {AllPizzasSelector, IngredientsSelector, SizePizzaSelector} from '../../../logic/store/selectors/PizzaSelector';
import {Ingredient} from '../../models/Ingredient';
import {PizzaService} from '../../../logic/store/actions/pizza/pizza.service';
import {Size} from '../../models/Size';
import {tap} from 'rxjs/operators';
import {CartService} from '../../../logic/services/post.service/cart/cart.service';
import {Cart} from '../../models/Cart';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserActionsService} from '../../../logic/store/actions/user/user-actions.service';

@Component({
  selector: 'app-pizza-choose-sheet',
  templateUrl: './pizza-choose-sheet.component.html',
  styleUrls: ['./pizza-choose-sheet.component.css']
})
export class PizzaChooseSheetComponent implements OnInit {
  diameter: number;
  url = 'http://localhost:8080/pizza/image/';
  sizeUrl = 'http://localhost:8080/size/image/';
  cart: Cart;
  classSize = 'pizza-card-image-content';
  size: Observable<Size> = this.store$.pipe(select(SizePizzaSelector));
  pizzaSize: string;
  pizzas: Pizza[];
  ingredients: Observable<Ingredient[]> = this.store$.pipe(select(IngredientsSelector));
  pizza: Pizza;
  subscription: Subscription;
  pizzaName: string[];
  isActive = false;
  isAddPrice1: boolean;
  isAddPrice2: boolean;
  isAddPrice3: boolean;
  isAddName: boolean;

  constructor(private bottomSheetRef: MatBottomSheetRef<PizzaChooseSheetComponent>,
              public themeObjectService: ThemeObjectService,
              private pizzaService: PizzaService,
              private cartService: CartService,
              private userActionsService: UserActionsService,
              private snackBar: MatSnackBar,
              private store$: Store) {
  }

  ngOnInit(): void {
    this.subscription = this.store$.pipe(select(AllPizzasSelector)).subscribe(data => this.pizzas = data);
    const index = this.pizzas.findIndex(value => value.id === this.themeObjectService.data.value.idChoose);
    this.pizza = this.pizzas[index];
    this.pizzaName = this.pizza.description.split(',');
    this.isAddName = false;
    this.isAddPrice1 = false;
    this.isAddPrice2 = false;
    this.isAddPrice3 = false;
    this.pizzaSize = 'small';
  }

  onAdd(price: number, name: string, i: number): void {
    debugger;
    if (i === 0 && !this.isAddPrice1) {
      this.isAddPrice1 = !this.isAddPrice1;
      this.themeObjectService.data.value.price = this.themeObjectService.data.value.price + price;
      this.isActive = !this.isActive;
      this.pizzaName.push(name);
    } else if (i === 0 && this.isAddPrice1) {
      this.isAddPrice1 = !this.isAddPrice1;
      this.themeObjectService.data.value.price = this.themeObjectService.data.value.price - price;
      // @ts-ignore
      this.isActive = !this.isActive;
      this.pizzaName = this.pizzaName.filter(value => value !== name);
    } else if (i === 1 && !this.isAddPrice2) {
      this.isAddPrice2 = !this.isAddPrice2;
      this.themeObjectService.data.value.price = this.themeObjectService.data.value.price + price;
      this.pizzaName.push(name);
    } else if (i === 1 && this.isAddPrice2) {
      this.isAddPrice2 = !this.isAddPrice2;
      this.themeObjectService.data.value.price = this.themeObjectService.data.value.price - price;
      this.pizzaName = this.pizzaName.filter(value => value !== name);
    } else if (i === 2 && !this.isAddPrice3) {
      this.isAddPrice3 = !this.isAddPrice3;
      this.themeObjectService.data.value.price = this.themeObjectService.data.value.price + price;
      this.pizzaName.push(name);
    } else if (i === 2 && this.isAddPrice3) {
      this.isAddPrice3 = !this.isAddPrice3;
      this.themeObjectService.data.value.price = this.themeObjectService.data.value.price - price;
      this.pizzaName = this.pizzaName.filter(value => value !== name);
    }
  }

  onLargePizza(id: number): void {
    this.pizzaService.getSizePizza(id, 'large');
    this.classSize = 'pizza-card-image-content-large';
    this.isAddPrice1 = false;
    this.isAddPrice2 = false;
    this.isAddPrice3 = false;
    this.pizzaName = this.pizza.description.split(',');
    this.pizzaSize = 'large';
  }

  onMediumPizza(id: number): void {
    this.pizzaService.getSizePizza(id, 'medium');
    this.classSize = 'pizza-card-image-content-medium';
    this.isAddPrice1 = false;
    this.isAddPrice2 = false;
    this.isAddPrice3 = false;
    this.pizzaName = this.pizza.description.split(',');
    this.pizzaSize = 'medium';
  }

  onSmallPizza(id: number): void {
    this.pizzaService.getSizePizza(id, 'small');
    this.classSize = 'pizza-card-image-content';
    this.isAddPrice1 = false;
    this.isAddPrice2 = false;
    this.isAddPrice3 = false;
    this.pizzaName = this.pizza.description.split(',');
    this.pizzaSize = 'small';
  }

  savePizzaInBasket(id: number): void {
    this.cart = {
      description: this.pizzaName.join(', '),
      pizzaId: id,
      price: this.themeObjectService.data.value.price,
      userId: this.themeObjectService.data.value.userId,
      size: this.pizzaSize,
    };
    this.themeObjectService.data.value.message = 'Pizza added to basket';
    // this.cartService.savePizzaInCart(this.basket).subscribe(data => {
    //   this.snackBar.openFromComponent(SnackBarComponent, {
    //     duration: 2000,
    //   });
    //   console.log(data);
    // });
    this.userActionsService.postElementInCart(this.cart)
  }
}
