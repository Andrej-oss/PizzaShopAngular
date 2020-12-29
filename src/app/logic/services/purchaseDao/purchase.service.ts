import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Purchase} from '../../../components/models/Purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = 'http://localhost:8080/purchase/';

  constructor(private httpClient: HttpClient) { }
  getPurchasesByUser(userId: number): Observable<Purchase[]>{
    return this.httpClient.get<Purchase[]>(this.baseUrl + `${userId}`);
  }
  deletePurchase(id: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.baseUrl + `${id}`);
  }
}
