import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pizza} from '../../../../components/models/Pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaGetService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }
  getAllPizza(): Observable<Pizza[]>{
    return this.httpClient.get<Pizza[]>(this.baseUrl + '/pizza');
  }
}
