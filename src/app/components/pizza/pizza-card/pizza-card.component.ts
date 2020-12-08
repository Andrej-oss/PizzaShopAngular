import {Component, Input, OnInit} from '@angular/core';
import {Pizza} from '../../models/Pizza';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {PizzaChooseSheetComponent} from '../pizza-choose-sheet/pizza-choose-sheet.component';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';
import {PizzaService} from '../../../logic/store/actions/pizza/pizza.service';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.css']
})
export class PizzaCardComponent implements OnInit {
@Input()
pizza: Pizza;
  url = 'http://localhost:8080/pizza/image/';
  ingredients: string[];

  constructor(private bottomSheet: MatBottomSheet,
              private themeObjectService: ThemeObjectService,
              private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.ingredients = this.pizza.ingredients.split(',');
    console.log(this.ingredients);
    // tslint:disable-next-line:radix
    this.themeObjectService.data.value.ingredients = this.ingredients.map(data => parseInt(data));
  }

  onChoosePizza(id: number): void{
    this.themeObjectService.data.value.idChoose = id;
    console.log(this.themeObjectService.data.value.idChoose);
    this.bottomSheet.open(PizzaChooseSheetComponent);
    this.pizzaService.getSizePizza(id, 'small');
  }
}