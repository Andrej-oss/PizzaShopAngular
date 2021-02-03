import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pizza} from '../../models/Pizza';
import {Ingredient} from '../../models/Ingredient';
import {PizzaActionService} from '../../../logic/store/actions/pizza/pizza-action.service';
import {PizzaService} from '../../../logic/services/pizzaDao/pizza.service';
import {IngredientService} from '../../../logic/services/ingredientDao/ingredient.service';
import {ThemeObjectService} from "../../../logic/theme-object/theme-object.service";

@Component({
  selector: 'app-form-pizza-posting',
  templateUrl: './form-pizza-posting.component.html',
  styleUrls: ['./form-pizza-posting.component.css']
})
export class FormPizzaPostingComponent implements OnInit {
  @Input()
  pizza: Pizza;
  url = 'http://localhost:8080/pizza/image/';
  ingredients: Ingredient[];
  arrayIngredients: number[];
  pizzas: Pizza[];
  pizzaForm: FormGroup;
  pizzaName: FormControl;
  pizzaDescription: FormControl;
  pricePizza: FormControl;
  newPizza: FormControl;
  pizzaId: FormControl = new FormControl('', Validators.required);
  image: FormControl = new FormControl('');
  formData: FormData = new FormData();

  constructor(private pizzaActionService: PizzaActionService,
              private pizzaService: PizzaService,
              public themeObjectService: ThemeObjectService,
              private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.pizzaForm = new FormGroup({
      pizzaName: this.pizzaName = new FormControl(this.pizza ? this.pizza.name : '', Validators.required),
      pizzaDescription: this.pizzaDescription = new FormControl(this.pizza ? this.pizza.description : '', Validators.required),
      pricePizza: this.pricePizza = new FormControl(this.pizza ? this.pizza.price : '', [Validators.required]),
      newPizza: this.newPizza = new FormControl(this.pizza ? this.pizza.newPizza : false),
      image: this.image
    });
    this.pizza ? this.arrayIngredients = this.pizza.ingredients.split(',').map(value => +value) : this.arrayIngredients = [];
    this.ingredientService.getAllIngredients().subscribe(data => this.ingredients = data);
    if (this.pizza){
      this.pizzaActionService.getSizesPizza(this.pizza.id);
    }
  }

  upLoadFile(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.pizzaForm.patchValue({
      image: file
    });
    this.pizzaForm.get('image').updateValueAndValidity();
  }

  onSave(pizzaForm: FormGroup): void {
    this.formData.append('name', pizzaForm.controls.pizzaName.value);
    this.formData.append('description', pizzaForm.controls.pizzaDescription.value);
    this.formData.append('price', pizzaForm.controls.pricePizza.value);
    this.formData.append('newPizza', pizzaForm.controls.newPizza.value);
    this.formData.append('ingredients', this.arrayIngredients.toString());
    // @ts-ignore
    this.formData.append('ordersCount', 0);
    console.log(this.formData, this.formData.append('image', pizzaForm.controls.image.value));
    this.pizzaService.savePizza(this.formData, this.formData.append('image', pizzaForm.controls.image.value))
      .subscribe(data => this.pizzas = data);
    pizzaForm.reset();
    this.resetFormData();
    this.arrayIngredients = [];
  }

  resetFormData(): void {
    this.formData.delete('name');
    this.formData.delete('description');
    this.formData.delete('price');
    this.formData.append('newPizza', 'false');
    this.formData.delete('image');
    this.formData.delete('ingredients');
  }
  onAddIngredient(pizzaId: FormControl): void {
    this.arrayIngredients.push(pizzaId.value);
  }
  onDeleteIngredient(): void{
    this.arrayIngredients.pop();
  }
  onUpdate(pizzaForm: FormGroup): void{
    this.formData.append('name', pizzaForm.controls.pizzaName.value);
    this.formData.append('description', pizzaForm.controls.pizzaDescription.value);
    // @ts-ignore
    this.formData.append('price', +pizzaForm.controls.pricePizza.value);
    this.formData.append('newPizza', pizzaForm.controls.newPizza.value);
    this.formData.append('ingredients', this.arrayIngredients.toString());
    console.log(this.formData, this.formData.append('image', pizzaForm.controls.image.value));
    this.pizzaActionService.updatePizza(this.pizza.id,
      this.formData,
      this.formData.append('image', pizzaForm.controls.image.value));
    pizzaForm.reset();
    this.resetFormData();
    this.arrayIngredients = [];
  }
}
