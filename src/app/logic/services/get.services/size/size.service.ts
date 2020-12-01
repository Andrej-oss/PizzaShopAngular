import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Size} from '../../../../components/models/Size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getPizzaSize(id: number, name: string): Observable<Size>{
    return this.httpClient.get<Size>(this.baseUrl + `/size/${id}/${name}`);
  }
}
