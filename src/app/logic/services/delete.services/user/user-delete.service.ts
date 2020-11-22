import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../../components/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserDeleteService {
 private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }
  deleteUser(id: number): Observable<User[]>{
    return  this.httpClient.delete<User[]>(this.baseUrl + `/user/${id}`);
  }
}
