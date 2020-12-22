import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  private baseURL = 'http://localhost:8080/voice/';
  constructor(private httpClient: HttpClient) { }
  deleteVoiceComment(id: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(this.baseURL + `${id}`);
  }
}
