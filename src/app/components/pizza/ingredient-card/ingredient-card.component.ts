import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from '../../models/Ingredient';

@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.css']
})
export class IngredientCardComponent implements OnInit {
@Input()
ingredient: Ingredient;
  url = 'http://localhost:8080/ingredient/image/';

  constructor() { }

  ngOnInit(): void {
  }

}
