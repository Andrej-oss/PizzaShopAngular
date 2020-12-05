import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../../../../components/models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartGetService {
  private baseUrl = 'http://localhost:8080/cart';

  constructor(private httpClient: HttpClient) { }
  getAllCartsElements(id: number): Observable<Cart[]>{
    debugger;
    return this.httpClient.get<Cart[]>(this.baseUrl + `/${id}`);
}
}
