import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from 'src/app/components/models/User';
import {Observable} from 'rxjs';
import {AuthUser} from '../../../../components/models/AuthUser';
import {tap} from 'rxjs/operators';
import {ThemeObjectService} from '../../../theme-object/theme-object.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:8080';
  private token = null;
  private authority = null;
  private userName = null;

  constructor(private httpClient: HttpClient,
              private themeObjectService: ThemeObjectService) { }

  saveUser(user: User): Observable<User[]>{
    console.log(user)
    return  this.httpClient.post<User[]>(this.baseURL + '/user', user);
  }
  authenticateUser(authUser: AuthUser): Observable<{token: string, role: string, username: string}>{
    return this.httpClient
      .post<{token: string, role: string, username: string}>(this.baseURL + '/user/authenticate', authUser)
      .pipe(
        tap(({token, role, username }) => {
          this.themeObjectService.data.value.isAuthLoad = false;
          localStorage.setItem('token', token);
          this.setToken(token);
          if (role.startsWith('[ROLE_') && role.endsWith(']')) {
            const rol = role.split('');
            rol.splice(0, 6);
            rol.splice(-1, 1);
            const s = rol.join('');
            this.setAuthority(s);
            console.log(this.authority);
          }
          this.userName = username;
        }
      ));
  }
  setToken(token: string): void{
    this.token = token;
  }
  getToken(): string{
    return this.token;
  }
  isAuthenticated(): boolean{
    return !!this.token;
  }
  logOut(): void{
    this.token = null;
    localStorage.removeItem('token');
    this.authority = null;
    this.themeObjectService.data.value.userId = 0;
    this.themeObjectService.data.value.userName = '';
  }
  setAuthority(role: string): void{
    this.authority = role;
  }
  getAuthority(): string{
    return this.authority;
  }
  isAdmin(): boolean{
   return  this.authority === 'ADMIN' ? true : false;
  }
  isUser(): boolean{
    return this.authority === 'USER' ? true : false;
  }
  getUserName(): string{
    return this.userName;
  }
}
