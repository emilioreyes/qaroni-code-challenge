import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TokenStore } from '../../auth/session/store/token.store';
import { LoginStore } from '../../auth/login/store/login.store';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  providers: [ LoginStore],
})
export class Navbar {
  tokenStore = inject(TokenStore);
  loginStore = inject(LoginStore);
  router = inject(Router);
  @Output() onClick = new EventEmitter<boolean>();

  onClickLogout() {
    this.tokenStore.clearToken();
    this.loginStore.logout();
    console.log('navegamdo');

    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
   onHideSubmenu(){
    this.onClick.emit(true);
  }
}
