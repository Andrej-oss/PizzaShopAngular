import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../../../../components/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/comment/';
  constructor(private httpClient: HttpClient) { }
  saveComment(pizzaId: number, userId: number, comment: Comment): Observable<Comment[]>{
    return this.httpClient.post<Comment[]>(this.baseUrl + `${userId}/${pizzaId}`, comment);
  }
  editComment(id: number, comment: Comment): Observable<boolean>{
    return this.httpClient.put<boolean>(this.baseUrl + `${id}`, comment);
  }
}
