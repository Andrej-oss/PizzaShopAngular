import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentDeleteService {
  private baseUrl = 'http://localhost:8080/comment/';
  constructor(private httpClient: HttpClient) { }
  deleteComment(id: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.baseUrl + `${id}`);
  }
}
