import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { PatientRemdisService } from '../../../services/patient-remdis.service';
import { RekamMedisResDto } from '../../../dto/remdis/RemdisResDto';
import { RemdisService } from '../../../services/remdis.service';
import { PatientService } from '../../../services/patient.service';
import { BASE_URL } from '../../../constant/api.constant';

@Component({
  selector: 'detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.styles.css'],
})
export class DetailPatientComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private patientRemdisService: PatientRemdisService,
    private remdisService: RemdisService,
    private patientService: PatientService
  ) {}

  get isAdmin() {
    return this.authService.getProfile()?.role === 'admin';
  }

  url = BASE_URL;

  poliId: string | undefined = this.authService.getProfile()?.id;
  patientId: string | null = '';
  isEdited: boolean = false;
  remdis: RekamMedisResDto[] = [];
  isModalCreateRemdis: boolean = false;
  isModalDetailRemdis: boolean = false;
  loadingCreateRemdis: boolean = false;

  genders: any[] = [
    { name: 'Laki-Laki', key: 'laki-laki' },
    { name: 'Perempuan', key: 'perempuan' },
  ];

  // Helper variable for innerHTML
  riwayat_penyakit_obat_opsional_text: string | undefined;
  rencana_tindakan_opsional_text: string | undefined;
  pemeriksaan_fisik_tambahan_opsional_text: string | undefined;

  patientForm = this.fb.group({
    nama: ['', Validators.required],
    NIK: ['', Validators.required],
    pekerjaan: ['', Validators.required],
    no_telp: ['', Validators.required],
    usia: [0, Validators.required],
    agama: ['', Validators.required],
    jenis_kelamin: ['', Validators.required],
    // createdBy: ['', Validators.required],
    alamat: ['', Validators.required],
  });

  remdisForm = this.fb.group({
    userId: ['', Validators.required],
    pasienId: ['', Validators.required],
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

  remdisDetail = this.fb.group({
    userId: ['', Validators.required],
    pasienId: ['', Validators.required],
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

  ngOnInit(): void {
    this.getData();
  }

  cancelEdit() {
    this.getData();
    this.isEdited = false;
  }

  saveEdit() {
    firstValueFrom(this.activatedRoute.paramMap)
      .then((res) => {
        firstValueFrom(
          this.patientService.updatePatient({
            ...this.patientForm.getRawValue(),
            id: res.get('id'),
          })
        )
          .then((res) => {
            this.getData();
            this.isEdited = false;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  getData() {
    firstValueFrom(this.activatedRoute.paramMap)
      .then((res) => {
        this.patientId = res.get('id');

        if (this.authService.getProfile()?.role === 'admin') {
          firstValueFrom(
            this.patientRemdisService.getPasientAndAllRemdis(this.patientId)
          )
            .then((res) => {
              console.log(res);
              this.patientForm.get('nama')?.setValue(res.nama);
              this.patientForm.get('NIK')?.setValue(res.NIK);
              this.patientForm.get('pekerjaan')?.setValue(res.pekerjaan);
              this.patientForm.get('agama')?.setValue(res.agama);
              this.patientForm.get('no_telp')?.setValue(res.no_telp);
              this.patientForm.get('usia')?.setValue(res.usia);
              this.patientForm
                .get('jenis_kelamin')
                ?.setValue(res.jenis_kelamin);
              this.patientForm.get('alamat')?.setValue(res.alamat);
              this.remdis = res.rekam_medis;
            })
            .catch((err) => console.log(err));
        } else {
          firstValueFrom(
            this.patientRemdisService.getPasientAndRemdisByPoli(
              res.get('id'),
              this.poliId
            )
          )
            .then((res) => {
              this.patientForm.get('nama')?.setValue(res.nama);
              this.patientForm.get('NIK')?.setValue(res.NIK);
              this.patientForm.get('pekerjaan')?.setValue(res.pekerjaan);
              this.patientForm.get('agama')?.setValue(res.agama);
              this.patientForm.get('no_telp')?.setValue(res.no_telp);
              this.patientForm.get('usia')?.setValue(res.usia);
              this.patientForm
                .get('jenis_kelamin')
                ?.setValue(res.jenis_kelamin);
              this.patientForm.get('alamat')?.setValue(res.alamat);

              this.remdis = res.rekam_medis;
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  onCreateRemdis() {
    this.remdisForm.get('userId')?.setValue(this.poliId ? this.poliId : '');
    this.remdisForm
      .get('pasienId')
      ?.setValue(this.patientId ? this.patientId : '');
    if (this.remdisForm.valid) {
      this.loadingCreateRemdis = true;
      firstValueFrom(
        this.remdisService.createRemdis(this.remdisForm.getRawValue())
      )
        .then((res) => {
          this.getData();
          this.loadingCreateRemdis = false;
          this.isModalCreateRemdis = false;
        })
        .catch((err) => console.log(err));
    }
  }

  closeModalRmedis() {
    this.remdisForm.reset();
    this.isModalCreateRemdis = false;
  }

  openDetailRemdisModal(id: String) {
    const data = this.remdis.find((data) => data.id === id);

    if (data) {
      this.remdisDetail.get('userId')?.setValue(data?.userId);
      this.remdisDetail.get('pasienId')?.setValue(data?.pasienId);
      this.remdisDetail.get('keluhan_utama')?.setValue(data?.keluhan_utama);
      this.remdisDetail
        .get('riwayat_penyakit_obat_opsional')
        ?.setValue(data.riwayat_penyakit_obat_opsional);
      this.remdisDetail
        .get('diagnosa_penyakit')
        ?.setValue(data.diagnosa_penyakit);
      this.remdisDetail
        .get('rencana_tindakan_opsional')
        ?.setValue(data.rencana_tindakan_opsional);

      this.remdisDetail.get('tekanan_darah')?.setValue(data.tekanan_darah);
      this.remdisDetail.get('denyut_nadi')?.setValue(data.denyut_nadi);
      this.remdisDetail.get('pernapasan')?.setValue(data.pernapasan);
      this.remdisDetail.get('suhu_tubuh')?.setValue(data.suhu_tubuh);
      this.remdisDetail.get('tinggi_badan')?.setValue(data.tinggi_badan);
      this.remdisDetail.get('berat_badan')?.setValue(data.berat_badan);
      this.remdisDetail
        .get('pemeriksaan_fisik_tambahan_opsional')
        ?.setValue(data.pemeriksaan_fisik_tambahan_opsional);
      this.remdisDetail.get('nama_dokter')?.setValue(data.nama_dokter);

      this.riwayat_penyakit_obat_opsional_text = this.remdisDetail.get(
        'riwayat_penyakit_obat_opsional'
      )?.value;
      this.rencana_tindakan_opsional_text = this.remdisDetail.get(
        'rencana_tindakan_opsional'
      )?.value;
      this.pemeriksaan_fisik_tambahan_opsional_text = this.remdisDetail.get(
        'pemeriksaan_fisik_tambahan_opsional'
      )?.value;
    }

    this.isModalDetailRemdis = true;
  }
}
