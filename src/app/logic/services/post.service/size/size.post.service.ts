import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SizePizza} from '../../../../components/models/SizePizza';

@Injectable({
  providedIn: 'root'
})
export class SizePostService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  saveSizePizza(formData: FormData, id: number, value: any): Observable<SizePizza[]>{
    console.log(formData, id, value, this.baseUrl + `/size/${id}`);
    return this.httpClient.post<SizePizza[]>(this.baseUrl + `/size/${id}`, formData);
  }
}
