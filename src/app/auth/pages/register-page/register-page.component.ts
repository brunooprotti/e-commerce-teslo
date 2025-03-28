import { AuthService } from '@/auth/services/Auth.service';
import { AlertComponent } from '@/shared/components/alert/alert.component';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule,AlertComponent],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {
  fb = inject(FormBuilder);
  private _router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  authService = inject(AuthService);

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(){

    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control?.invalid) {
        console.log(`El campo ${key} es inválido:`, control.errors);
      }
    });


    console.log(this.registerForm);
    if( this.registerForm.invalid ){
      this.hasError.set(true);
      setTimeout( () => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { fullName = '', email = '', password = '' } = this.registerForm.value;

    this.authService.Register(fullName!, email!, password!)
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
