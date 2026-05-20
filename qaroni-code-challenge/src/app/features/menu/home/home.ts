import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { LoginStore } from '../../auth/login/store/login.store';
import { TokenStore } from '../../auth/session/store/token.store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,Navbar, CommonModule, RouterOutlet,MatIconModule,MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
    providers: [LoginStore]
})
export class Home {

  show:boolean=true
  tokenStore = inject(TokenStore);
  router= inject(Router);
 
  showNavbar(){
    this.show=!this.show
  }
  
  closeNavbar(value:boolean){
    this.show=!this.show
  }
}
