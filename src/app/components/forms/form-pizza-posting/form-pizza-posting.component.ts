import { Component, OnInit } from '@angular/core';
import {PizzaService} from '../../../logic/services/post.service/pizza/pizza.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {sizes} from '../../../constants/Constants';
import {Pizza} from '../../models/Pizza';
import {PizzaGetService} from '../../../logic/services/get.services/pizza/pizza.get.service';
import {Ingredient} from '../../models/Ingredient';
import {IngredientGetService} from '../../../logic/services/get.services/ingredient/ingredient.get.service';
import {SizePostService} from '../../../logic/services/post.service/size/size.post.service';

@Component({
  selector: 'app-form-pizza-posting',
  templateUrl: './form-pizza-posting.component.html',
  styleUrls: ['./form-pizza-posting.component.css']
})
export class FormPizzaPostingComponent implements OnInit {
  url = 'http://localhost:8080/pizza/image/';
   ingredients: Ingredient[];
   arrayIngredients: number[] = [];
  // sizes = sizes;
  pizzas: Pizza[];
  isLinear = true;
  pizzaForm: FormGroup;
  // sizeForm: FormGroup;
  // pizzaSizeForm: FormGroup;
  pizzaName: FormControl = new FormControl('', Validators.required);
  pizzaDescription: FormControl = new FormControl('', Validators.required);
  pricePizza: FormControl = new FormControl('', [Validators.required]);
  new: FormControl = new FormControl(false);
  // sizePizza: FormControl = new FormControl('', Validators.required);
  // priceSize: FormControl = new FormControl('', Validators.required);
   pizzaId: FormControl = new FormControl('', Validators.required);
  // diameter: FormControl = new FormControl('', Validators.required);
  // weight: FormControl = new FormControl('', Validators.required);
   image: FormControl = new FormControl('', Validators.required);
  // file: FormControl = new FormControl('', Validators.required);
  formData: FormData = new FormData();
  // sizeFormData: FormData = new FormData();
  constructor(private pizzaService: PizzaService,
              private pizzaGetService: PizzaGetService,
              private ingredientGetService: IngredientGetService,
              private sizePostService: SizePostService) {
    this.pizzaForm = new FormGroup({
      pizzaName: this.pizzaName,
      pizzaDescription: this.pizzaDescription,
      pricePizza: this.pricePizza,
      new: this.new,
      image: this.image
    });
    // this.pizzaSizeForm = new FormGroup({
    //  sizePizza: this.sizePizza,
    //   priceSize: this.priceSize,
    //   pizzaId: this.pizzaId,
    //   diameter: this.diameter,
    //   weight: this.weight,
    //   file: this.file
    // });
  }

  ngOnInit(): void {
     this.pizzaGetService.getAllPizza().subscribe(data => this.pizzas = data);
     this.ingredientGetService.getAllIngredients().subscribe(data => this.ingredients = data);
  }

  upLoadFile(event): void{
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.pizzaForm.patchValue({
      image: file
      });
    this.pizzaForm.get('image').updateValueAndValidity();
  }

  onSave(pizzaForm: FormGroup): void{
    this.formData.append('name', pizzaForm.controls.pizzaName.value);
    this.formData.append('description', pizzaForm.controls.pizzaDescription.value);
    this.formData.append('price', pizzaForm.controls.pricePizza.value);
    this.formData.append('newPizza', pizzaForm.controls.new.value);
    this.formData.append('ingredients', this.arrayIngredients.toString());
    console.log(this.formData, this.formData.append('image', pizzaForm.controls.image.value));
    this.pizzaService.savePizza(this.formData, this.formData.append('image', pizzaForm.controls.image.value))
      .subscribe(data => this.pizzas = data);
    pizzaForm.reset();
    this.resetFormData();
    this.arrayIngredients = [];
  }
  resetFormData(): void{
    this.formData.delete('name');
    this.formData.delete('description');
    this.formData.delete('price');
    this.formData.append('newPizza', 'false');
    this.formData.delete('image');
    this.formData.delete('ingredients');
  }
  // resetSizeFormData(): void{
  //   this.sizeFormData.delete('name');
  //   this.sizeFormData.delete('price');
  //   this.sizeFormData.delete('diameter');
  //   this.sizeFormData.delete('weight');
  //   this.sizeFormData.delete('data');
  // }

  // upLoadFileSize(event): void{
  //   const sizeImage = (event.target as HTMLInputElement).files[0];
  //   console.log(sizeImage);
  //   this.pizzaSizeForm.patchValue({
  //     file: sizeImage
  //   });
  //   this.pizzaSizeForm.updateValueAndValidity();
  // }

  onAddIngredient(pizzaId: FormControl): void{
    this.arrayIngredients.push(pizzaId.value);
  }

  // onTest(pizzaSizeForm: FormGroup): void {
  //   console.log(pizzaSizeForm);
  //   console.log(pizzaSizeForm.controls.sizePizza.value);
  //   this.sizeFormData.append('name', pizzaSizeForm.controls.sizePizza.value.size);
  //   this.sizeFormData.append('price', pizzaSizeForm.controls.priceSize.value);
  //   this.sizeFormData.append('diameter', pizzaSizeForm.controls.sizePizza.value.diameter);
  //   this.sizeFormData.append('weight', pizzaSizeForm.controls.weight.value);
  //   this.sizeFormData.append('file',  pizzaSizeForm.controls.file.value);
  //   this.sizePostService.saveSizePizza(this.sizeFormData,
  //     pizzaSizeForm.controls.pizzaId.value,
  //     pizzaSizeForm.controls.file.value).subscribe(data => console.log(data));
  //   // this.resetSizeFormData();
  //   // pizzaSizeForm.reset();
  // }
}
