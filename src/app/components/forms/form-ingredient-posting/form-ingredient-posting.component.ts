import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientService} from '../../../logic/services/post.service/ingredient/ingredient.service';
import {IngredientGetService} from '../../../logic/services/get.services/ingredient/ingredient.get.service';
import {Ingredient} from "../../models/Ingredient";

@Component({
  selector: 'app-form-ingredient-posting',
  templateUrl: './form-ingredient-posting.component.html',
  styleUrls: ['./form-ingredient-posting.component.css']
})
export class FormIngredientPostingComponent implements OnInit {
  @Input()
  ingredient: Ingredient;
  ingredients: Ingredient[];
  ingredientFormGroup: FormGroup;
  name: FormControl;
  price: FormControl;
  image: FormControl = new FormControl('', Validators.required);
  formData: FormData = new FormData();
  constructor(private ingredientService: IngredientService,
              private ingredientGetService: IngredientGetService) {
  }

  ngOnInit(): void {
    this.ingredientFormGroup = new FormGroup({
      name: this.name = new FormControl(this.ingredient ? this.ingredient.name : '', Validators.required),
      price: this.price = new FormControl(this.ingredient ? this.ingredient.price : '', Validators.required),
      image: this.image
    });
  }

  saveIngredient(ingredientFormGroup: FormGroup): void{
    this.formData.append('name', ingredientFormGroup.controls.name.value);
    this.formData.append('price', ingredientFormGroup.controls.price.value);
    this.ingredientService.saveIngredient(this.formData,
      this.formData.append('image', ingredientFormGroup.controls.image.value)).subscribe(data => console.log(data));
    this.ingredientFormGroup.reset();
    this.clearFormData();
  }

  upLoadFile(event): void {
    console.log(event);
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.ingredientFormGroup.patchValue({
      image: file
    });
    this.ingredientFormGroup.get('image').updateValueAndValidity();
  }
  clearFormData(): void{
    this.formData.delete('name');
    this.formData.delete('price');
    this.formData.delete('image');
  }
}
