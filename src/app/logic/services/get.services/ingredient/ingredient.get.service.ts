import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ingredient} from '../../../../components/models/Ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientGetService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }
  getAllIngredients(): Observable<Ingredient[]>{
    return this.httpClient.get<Ingredient[]>(this.baseUrl + '/ingredient');
  }
}
