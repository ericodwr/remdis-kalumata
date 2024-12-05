import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { PatientRemdisService } from '../../../services/patient-remdis.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.styles.css'],
})
export class CreatePatientComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private patientRemdisService: PatientRemdisService,
    private router: Router
  ) {}

  loadingButton: boolean = false;
  poliId: string | undefined = this.authService.getProfile()?.id;
  genders: any[] = [
    { name: 'Laki-Laki', key: 'laki-laki' },
    { name: 'Perempuan', key: 'perempuan' },
  ];

  remdis: [] = [];

  createPatientForm = this.fb.group({
    nama: ['', Validators.required],
    NIK: ['', Validators.required],
    pekerjaan: ['', Validators.required],
    no_telp: ['', Validators.required],
    usia: [0, Validators.required],
    agama: ['', Validators.required],
    jenis_kelamin: ['', Validators.required],
    createdBy: [''],
    alamat: ['', Validators.required],
  });

  createRemdisForm = this.fb.group({
    userId: [''],
    keluhan_utama: ['', Validators.required],
    riwayat_penyakit_obat_opsional: [''],
    diagnosa_penyakit: ['', Validators.required],
    rencana_tindakan_opsional: [''],
    tekanan_darah: [''],
    denyut_nadi: [0],
    pernapasan: [0],
    suhu_tubuh: [''],
    tinggi_badan: [0],
    berat_badan: [0],
    pemeriksaan_fisik_tambahan_opsional: [''],
    nama_dokter: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    this.createPatientForm
      .get('createdBy')
      ?.setValue(this.poliId ? this.poliId : '');
    this.createRemdisForm
      .get('userId')
      ?.setValue(this.poliId ? this.poliId : '');

    if (this.createPatientForm.valid && this.createRemdisForm.valid) {
      this.loadingButton = true;
      const data = {
        patient: this.createPatientForm.getRawValue(),
        remdis: this.createRemdisForm.getRawValue(),
      };

      firstValueFrom(this.patientRemdisService.createPatientRemdis(data))
        .then((res) => {
          this.loadingButton = false;
          console.log(res);
          this.router.navigateByUrl('/patient');
        })
        .catch((err) => {
          this.loadingButton = false;
          console.log(err);
        });
    }
  }

  onCancel() {
    this.createPatientForm.reset();
    this.createRemdisForm.reset();
    this.router.navigateByUrl('/patient');
  }
}
