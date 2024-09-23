import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PoliService } from '../../../services/poli.service';
import { firstValueFrom } from 'rxjs';
import { CreatePoliReqDto } from '../../../dto/poli/PoliResDto';

@Component({
  selector: 'create-poli',
  templateUrl: './create-poli.component.html',
  styleUrls: ['./create-poli.styles.css'],
})
export class CreatePoliComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private title: Title,
    private poliService: PoliService
  ) {
    this.title.setTitle('Create Poli');
  }

  blockSpace: RegExp = /[^s]/;

  blockChars: RegExp = /^[^<>*!]+$/;

  loading = false;
  poliReqDto = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    nama: ['', Validators.required],
  });

  onCreatePoli() {
    if (this.poliReqDto.valid) {
      if (
        this.poliReqDto.get('password')?.value !=
        this.poliReqDto.get('confirmPassword')?.value
      ) {
        console.log('Confirm Password is not equal');
      } else {
        this.loading = true;
        const data: CreatePoliReqDto = {
          nama: this.poliReqDto.getRawValue().nama,
          username: this.poliReqDto.getRawValue().username,
          password: this.poliReqDto.getRawValue().password,
        };
        firstValueFrom(this.poliService.createPoli(data))
          .then((res) => {
            console.log(res);
            this.loading = false;
            this.router.navigateByUrl('/poli');
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      }
    } else {
      console.log('Please fill the form!');
    }
  }

  onCancel() {
    this.poliReqDto.reset();
    this.router.navigateByUrl('/poli');
  }
}
