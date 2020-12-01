import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../models/Ingredient';
import {IngredientGetService} from '../../../logic/services/get.services/ingredient/ingredient.get.service';
import {IngredientService} from '../../../logic/services/post.service/ingredient/ingredient.service';
import {SizePostService} from '../../../logic/services/post.service/size/size.post.service';
import {Pizza} from '../../models/Pizza';
import {sizes} from '../../../constants/Constants';
import {PizzaGetService} from '../../../logic/services/get.services/pizza/pizza.get.service';

@Component({
  selector: 'app-form-size-pizza-post',
  templateUrl: './form-size-pizza-post.component.html',
  styleUrls: ['./form-size-pizza-post.component.css']
})
export class FormSizePizzaPostComponent implements OnInit {
  url = 'http://localhost:8080/pizza/image/';
  sizes = sizes;
  pizzas: Pizza[];
  ingredients: Ingredient[];
  arrayIngredients: number[] = [];
  pizzaSizeForm: FormGroup;
  file: FormControl = new FormControl('', Validators.required);
  sizeFormData: FormData = new FormData();
  sizePizza: FormControl = new FormControl('', Validators.required);
  priceSize: FormControl = new FormControl('', Validators.required);
  pizzaId: FormControl = new FormControl('', Validators.required);
  diameter: FormControl = new FormControl('', Validators.required);
  weight: FormControl = new FormControl('', Validators.required);
  constructor(private ingredientGetService: IngredientGetService,
              private ingredientService: IngredientService,
              private pizzaGetService: PizzaGetService,
              private sizePostService: SizePostService) {
    this.pizzaSizeForm = new FormGroup({
      sizePizza: this.sizePizza,
      priceSize: this.priceSize,
      pizzaId: this.pizzaId,
      diameter: this.diameter,
      weight: this.weight,
      file: this.file
    });
  }

  ngOnInit(): void {
    this.pizzaGetService.getAllPizza().subscribe(data => this.pizzas = data);
    this.ingredientGetService.getAllIngredients().subscribe(data => this.ingredients = data);
  }
  resetSizeFormData(): void{
    this.sizeFormData.delete('name');
    this.sizeFormData.delete('price');
    this.sizeFormData.delete('diameter');
    this.sizeFormData.delete('weight');
    this.sizeFormData.delete('file');
  }

  upLoadFileSize(event): void{
    const sizeImage = (event.target as HTMLInputElement).files[0];
    console.log(sizeImage);
    this.pizzaSizeForm.patchValue({
      file: sizeImage
    });
    this.pizzaSizeForm.updateValueAndValidity();
  }

  onAddIngredient(pizzaId: FormControl): void{
    this.arrayIngredients.push(pizzaId.value);
  }

  onSave(pizzaSizeForm: FormGroup): void {
    console.log(pizzaSizeForm);
    console.log(pizzaSizeForm.controls.sizePizza.value);
    this.sizeFormData.append('name', pizzaSizeForm.controls.sizePizza.value.size);
    this.sizeFormData.append('price', pizzaSizeForm.controls.priceSize.value);
    this.sizeFormData.append('diameter', pizzaSizeForm.controls.sizePizza.value.diameter);
    this.sizeFormData.append('weight', pizzaSizeForm.controls.weight.value);
    this.sizeFormData.append('file',  pizzaSizeForm.controls.file.value);
    this.sizePostService.saveSizePizza(this.sizeFormData,
      pizzaSizeForm.controls.pizzaId.value,
      pizzaSizeForm.controls.file.value).subscribe(data => console.log(data));
    this.resetSizeFormData();
    pizzaSizeForm.reset();
  }
}
