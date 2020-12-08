import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../../../../components/models/Payment';
import {Observable} from 'rxjs';
import {Purchase} from '../../../../components/models/Purchase';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseURL = 'http://localhost:8080/stripe/';

  constructor(private httpClient: HttpClient) { }
  buy(payment: Payment): Observable<string>{
    return this.httpClient.post<string>(this.baseURL + 'payment', payment);
  }
  confirm(id: string, purchase: Purchase): Observable<string>{
    return  this.httpClient.post<string>(this.baseURL + `confirm/${id}/${purchase.userId}`, purchase);
  }
  cancel(id: string): Observable<string>{
    return this.httpClient.post<string>(this.baseURL + `cancel/${id}`, {});
  }
}