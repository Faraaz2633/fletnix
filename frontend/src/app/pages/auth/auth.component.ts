import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  heroEnvelope,
  heroFaceSmile,
  heroKey,
  heroEye,
  heroEyeSlash,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TUser } from '../../../utils/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [NgIcon, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './auth.component.html',
  viewProviders: [
    provideIcons({
      heroEnvelope,
      heroFaceSmile,
      heroKey,
      heroEye,
      heroEyeSlash,
      heroUser,
    }),
  ],
})
export class AuthComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  authForm!: FormGroup;
  isLoginForm: boolean = true;
  showPassword: boolean = false;

  email = '';
  password = '';
  age = '';
  name = '';

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(4),
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(4),
      ]),
      age: new FormControl(this.age),
      name: new FormControl(this.name),
    });
    this.setRegisterValidator();
  }

  handleSubmit() {
    console.log(this.authForm.get('age'));
    if (!this.authForm.valid) {
      this.toastr.error('Please fill all the details');
      return;
    }
    const data = {
      email: this.authForm.get('email')?.value as string,
      password: this.authForm.get('password')?.value as string,
      ...(!this.isLoginForm
        ? {
            name: this.authForm.get('name')?.value as string,
            age: Number(this.authForm.get('age')?.value) as number,
          }
        : {}),
    };
    if (this.isLoginForm) {
      this.handleLogin(data);
    } else {
      this.handleSignUp(data);
    }
  }

  setRegisterValidator(): void {
    const ageControl = this.authForm.get('age');
    const nameControl = this.authForm.get('name');

    if (!ageControl || !nameControl) return;

    if (!this.isLoginForm) {
      ageControl.setValidators([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
      ]);
      nameControl.setValidators([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]);
    } else {
      ageControl.setValidators([]);
      nameControl?.setValidators([]);
    }
    ageControl.updateValueAndValidity();
    nameControl.updateValueAndValidity();
  }

  handleLogin(data: TUser) {
    this.authService.login(data).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.data.access_token);
        this.router.navigate(['/shows']);
        this.toastr.success(data.message || 'User logged in successfully');
      },
      error: (e) => {
        this.toastr.error(e.error.message || 'Something went wrong');
      },
    });
  }

  handleSignUp(data: TUser) {
    this.authService.signup(data).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.data.access_token);
        this.router.navigate(['/shows']);
        this.toastr.success(data.message || 'User registered in successfully');
      },
      error: (e) => {
        this.toastr.error(e.error.message || 'Something went wrong');
      },
    });
  }

  handleChangeForm() {
    this.isLoginForm = !this.isLoginForm;
    this.setRegisterValidator();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
