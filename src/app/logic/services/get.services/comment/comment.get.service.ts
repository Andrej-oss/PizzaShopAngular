import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../../../../components/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentGetService {
  private baseUrl = 'http://localhost:8080/comment/';
  constructor(private httpClient: HttpClient) { }
  getComments(pizzaId: number): Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(this.baseUrl + `${pizzaId}`);
  }
}
