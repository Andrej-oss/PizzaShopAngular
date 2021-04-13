import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from '../../models/Ingredient';
import {ThemeObjectService} from '../../../logic/theme-object/theme-object.service';

@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.css']
})
export class IngredientCardComponent implements OnInit {
@Input()
ingredient: Ingredient;
@Input()
isActive: boolean;
  url = 'http://ec2-3-131-135-137.us-east-2.compute.amazonaws.com:8080/ingredient/image/';

  constructor(public themeObjectService: ThemeObjectService) { }

  ngOnInit(): void {
  }

}
