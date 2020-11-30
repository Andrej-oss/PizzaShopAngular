import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ingredient} from '../../../../components/models/Ingredient';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  saveIngredient(formData: FormData, append: void): Observable<Ingredient[]>{
    console.log(formData);
    return this.httpClient.post<Ingredient[]>(this.baseUrl + '/ingredient', formData);
  }
}
