import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginForm } from './login-form';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    fixture.componentRef.setInput('username', 'testuser');
    fixture.componentRef.setInput('password', 'testpassword');
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
