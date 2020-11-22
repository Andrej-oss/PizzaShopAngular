import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngredientService} from '../../../logic/services/post.service/ingredient/ingredient.service';

@Component({
  selector: 'app-form-ingredient-posting',
  templateUrl: './form-ingredient-posting.component.html',
  styleUrls: ['./form-ingredient-posting.component.css']
})
export class FormIngredientPostingComponent implements OnInit {
  ingredientFormGroup: FormGroup;
  name: FormControl = new FormControl('', Validators.required);
  price: FormControl = new FormControl('', Validators.required);
  image: FormControl = new FormControl('', Validators.required);
  formData: FormData = new FormData();
  constructor(private ingredientService: IngredientService) {
    this.ingredientFormGroup = new FormGroup({
      name: this.name,
      price: this.price,
      image: this.image
    });
  }

  ngOnInit(): void {
  }

  saveIngredient(ingredientFormGroup: FormGroup): void{
    this.formData.append('name', ingredientFormGroup.controls.name.value);
    this.formData.append('price', ingredientFormGroup.controls.price.value);
   // this.formData.append('image', ingredientFormGroup.controls.image.value);
    console.log(ingredientFormGroup.controls.name);
    console.log(this.ingredientFormGroup);
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
