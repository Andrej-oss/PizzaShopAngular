import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Voice} from '../../../../components/models/Voice';

@Injectable({
  providedIn: 'root'
})
export class VoicePostService {
  private baseURL = 'http://localhost:8080/voice/';
  constructor(private httpClient: HttpClient) { }
  saveVoice(id: number, voice: Voice): Observable<Voice[]>{
    return this.httpClient.post<Voice[]>(this.baseURL + `${id}`, voice);
  }
}
