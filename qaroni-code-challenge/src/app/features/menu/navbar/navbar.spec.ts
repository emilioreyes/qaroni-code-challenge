import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navbar } from './navbar';
import { TokenStore } from '../../auth/session/store/token.store';
import { LoginStore } from '../../auth/login/store/login.store';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [{ provide: TokenStore, useValue: {} }, { provide: LoginStore, useValue: {} },
        provideHttpClient(),provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
