import { Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { ButtonComponent } from '../../components/button/button.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, ButtonComponent],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Login Puskesmas Kalumata');
  }

  loading = false;
  loginReqDto = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  onLogin() {
    if (this.loginReqDto.valid) {
      this.loading = true;
      firstValueFrom(this.loginService.login(this.loginReqDto.getRawValue()))
        .then((res) => {
          this.loading = false;
          localStorage.setItem('data', JSON.stringify(res));
          this.router.navigateByUrl('/dashboard');
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    }
  }
}
