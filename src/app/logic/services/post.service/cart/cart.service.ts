import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../../../../components/models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }
  savePizzaInCart(cart: Cart): Observable<Cart[]>{
    return this.httpClient.post<Cart[]>(this.baseUrl + `/cart/${cart.userId}`, cart);
  }
}
