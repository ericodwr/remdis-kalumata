import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { PatientResDto } from '../../../dto/patient/PatientResDto';
import { PatientService } from '../../../services/patient.service';
import { firstValueFrom } from 'rxjs';
import { PatientRemdisService } from '../../../services/patient-remdis.service';

@Component({
  templateUrl: './list-patient.component.html',
  selector: 'list-patient',
  styleUrls: ['./list-patient.styles.css'],
})
export class ListPatientComponent implements OnInit {
  constructor(private title: Title, private patientService: PatientService) {
    this.title.setTitle('List Data Patient');
  }

  patients: PatientResDto[] = [];

  searchValue = '';

  ngOnInit(): void {
    firstValueFrom(this.patientService.getAllPatient())
      .then((res) => {
        this.patients = res;
      })
      .catch((err) => console.log(err));
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }
}
