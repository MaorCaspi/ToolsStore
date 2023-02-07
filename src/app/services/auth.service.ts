import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  readonly authAPIUrl = "https://localhost:7175/api/Auth";

  public register(user: User): Observable<string> {
    return this.http.post(this.authAPIUrl+'/register', user, {
      responseType: 'text',
    });
  }

  public login(user: User): Observable<string> {
    return this.http.post(this.authAPIUrl+'/login', user, {
      responseType: 'text',
    });
  }

  public isTokenExpired(token: string) {
    try{
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    catch{
      return true;
    }
  }
}