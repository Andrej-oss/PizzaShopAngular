import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../../../components/models/Payment';
import {Observable} from 'rxjs';
import {Purchase} from '../../../components/models/Purchase';
import {Cart} from '../../../components/models/Cart';
import {APiURL} from '../../../config/urlConfig';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseURL = APiURL.paymentURL;

  constructor(private httpClient: HttpClient) { }
  buy(payment: Payment): Observable<string>{
    return this.httpClient.post<string>(this.baseURL + 'payment', payment);
  }
  confirm(id: string, purchase: Purchase): Observable<string>{
    return  this.httpClient.post<string>(this.baseURL + `confirm/${id}/${purchase.userId}`, purchase);
  }
  confirmAllCart(id: string, userId: number, carts: Cart[]): Observable<string>{
    return this.httpClient.post<string>(this.baseURL + `confirm/all_cart/${id}/${userId}`, carts);
}
  cancel(id: string): Observable<string>{
    return this.httpClient.post<string>(this.baseURL + `cancel/${id}`, {});
  }
}
