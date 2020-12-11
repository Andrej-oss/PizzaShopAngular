import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartDeleteService {
  private baseUrl = 'http://localhost:8080/cart';

  constructor(private httpClient: HttpClient) { }
  deleteCart(id: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.baseUrl + `/${id}`);
  }
}
