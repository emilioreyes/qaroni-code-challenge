import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { TokenStore } from '../../auth/session/store/token.store';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [{ provide: TokenStore, useValue: {} },
        provideHttpClient(),provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
