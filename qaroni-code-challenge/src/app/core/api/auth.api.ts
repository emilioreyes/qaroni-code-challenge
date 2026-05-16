import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginFormValue, LoginResponse } from '../../features/auth/login/store/login.store';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  http = inject(HttpClient);
  login(payload: LoginFormValue) {
    return this.http.post<LoginResponse>(`${environment.URL_BASE}/merchants/${environment.MERCHANT_ID}/users/logins`, payload);
  }
}
