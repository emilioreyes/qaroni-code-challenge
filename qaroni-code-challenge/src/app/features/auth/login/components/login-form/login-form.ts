import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  readonly username = input.required<string>();
  readonly password = input.required<string>();
  readonly loading = input(false);
  readonly usernameChange = output<string>();
  readonly passwordChange = output<string>();
  readonly formSubmit = output<void>();

  onSubmit() {
    this.formSubmit.emit();
  }

  onUsernameChange(value: string) {
    this.usernameChange.emit(value);
  }

  onPasswordChange(value: string) {
    this.passwordChange.emit(value);
  }
}
