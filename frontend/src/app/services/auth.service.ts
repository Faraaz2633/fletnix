import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../utils/constants';
import { TUser } from '../../utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  validate(data: { access_token: string | null }): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/validate`, data);
  }

  login(data: TUser): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/login`, data);
  }

  signup(data: TUser): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/signup`, data);
  }

  isLoggedIn() {
    const access_token = localStorage.getItem('token');
    if (!access_token) return false;

    const payload = atob(access_token.split('.')[1]);
    const parsedPayload = payload ? JSON.parse(payload) : {};
    return parsedPayload?.exp > Date.now() / 1000;
  }
}
