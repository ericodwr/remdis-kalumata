import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { PatientResDto } from '../../../dto/patient/PatientResDto';
import { PatientService } from '../../../services/patient.service';
import { firstValueFrom } from 'rxjs';
import { PatientRemdisService } from '../../../services/patient-remdis.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  templateUrl: './list-patient.component.html',
  selector: 'list-patient',
  styleUrls: ['./list-patient.styles.css'],
})
export class ListPatientComponent implements OnInit {
  constructor(
    private title: Title,
    private patientService: PatientService,
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {
    this.title.setTitle('List Data Patient');
  }

  get isAdmin() {
    return this.authService.getProfile()?.role === 'admin';
  }

  patients: PatientResDto[] = [];

  searchValue = '';

  // Delete Func
  isModalDelete = false;
  loadingDelete = false;

  deleteForm = this.fb.group({
    id: ['', Validators.required],
  });

  onDeleteModal(id: string) {
    this.deleteForm.setValue({ id });
    this.isModalDelete = true;
  }

  deletePatient() {
    this.loadingDelete = true;
    firstValueFrom(
      this.patientService.deletePatient(this.deleteForm.getRawValue().id)
    )
      .then((res) => {
        this.loadingDelete = false;
        this.deleteForm.reset();
        this.getData();
        this.isModalDelete = false;
      })
      .catch((err) => console.log(err));
  }
  // Delete Func

  getData() {
    firstValueFrom(this.patientService.getAllPatient())
      .then((res) => {
        this.patients = res;
        console.log(this.isAdmin);
      })
      .catch((err) => console.log(err));
  }

  ngOnInit(): void {
    this.getData();
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }
}
