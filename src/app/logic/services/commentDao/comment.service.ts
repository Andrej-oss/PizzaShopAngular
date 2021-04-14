import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../../../components/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://ec2-3-131-135-137.us-east-2.compute.amazonaws.com:8080/comment/';
  constructor(private httpClient: HttpClient) { }
  getComments(pizzaId: number): Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(this.baseUrl + `${pizzaId}`);
  }
  deleteComment(id: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.baseUrl + `${id}`);
  }
  saveComment(pizzaId: number, userId: number, comment: Comment): Observable<Comment[]>{
    return this.httpClient.post<Comment[]>(this.baseUrl + `${userId}/${pizzaId}`, comment);
  }
  editComment(id: number, comment: Comment): Observable<boolean>{
    return this.httpClient.put<boolean>(this.baseUrl + `${id}`, comment);
  }
  getCommentsByUserId(name: string): Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(this.baseUrl + `user/${name}`);
  }
}
