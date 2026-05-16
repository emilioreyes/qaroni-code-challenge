import { Component, effect, inject } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { LoginStore } from '../../store/login.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  providers: [LoginStore],
})
export class LoginPage {
  store = inject(LoginStore);
  router = inject(Router);
  
  onUsernameChange(value: string) {
    this.store.updateField('username', value);
  }

  onPasswordChange(value: string) {
    this.store.updateField('password', value);
  }

  onSubmit() {
    this.store.submit();
  }
}
