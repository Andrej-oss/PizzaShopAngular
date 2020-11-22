import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../../components/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserGetService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }
  getUserByName(name: string): Observable<User>{
    return this.httpClient.get<User>(this.baseUrl + '/user/authenticate/' + name);
  }
  getAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseUrl + '/user');
  }
}
