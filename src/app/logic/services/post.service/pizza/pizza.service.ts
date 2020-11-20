import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pizza} from '../../../../components/models/Pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private baseUrl = 'http://localhost:8080';
  private error: string;

  constructor(private httpClient: HttpClient) { }

  savePizza(formData: FormData, append: void): Observable<Pizza[]>{
    console.log(formData)
    return  this.httpClient.post<Pizza[]>(this.baseUrl + '/pizza', formData);
  }
}
