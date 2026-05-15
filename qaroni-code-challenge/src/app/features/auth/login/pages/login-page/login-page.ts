import { Component, inject } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { LoginStore } from '../../store/login.store';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  providers: [LoginStore],
})
export class LoginPage {
  store = inject(LoginStore);

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
