import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertComponent } from "../../../shared/components/alert/alert.component";
import { AuthService } from '@/auth/services/Auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './login-page.component.html',
})
export default class LoginPageComponent {
  fb = inject(FormBuilder);
  private _router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(){
    if( this.loginForm.invalid ){
      this.hasError.set(true);
      setTimeout( () => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.Login(email!, password!)
      .subscribe( (isAuthenticated) => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          this._router.navigateByUrl('/');
          return;
        }

        this.hasError.set(true);
        setTimeout( () => {
          this.hasError.set(false);
        }, 2000);
        return;
      });
  }
}
