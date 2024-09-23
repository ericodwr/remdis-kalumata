import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BrowserModule, Title } from '@angular/platform-browser';
import { PoliService } from '../../services/poli.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';

interface DateData {
  name: string;
  value: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.styles.css'],
  standalone: true,
  imports: [SharedModule, FormsModule, ButtonModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  constructor(
    private title: Title,
    private poliService: PoliService,
    private patientService: PatientService
  ) {
    title.setTitle('Dashboard Puskesmas Kalumata');
  }

  weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  tabs: { title: string; content: string }[] = [
    { title: 'All', content: 'All Content' },
  ];

  currentDate = new Date();
  lastWeekDate = new Date(this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  lastMonthDate = new Date(
    this.currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
  );
  last6MonthDate = new Date(
    this.currentDate.getTime() - 180 * 24 * 60 * 60 * 1000
  );
  lastYearDate = new Date(
    this.currentDate.getTime() - 365 * 24 * 60 * 60 * 1000
  );

  data: any;

  options: any;

  dateDropdown: DateData[] = [
    {
      name: `7 hari Terakhir (${this.lastWeekDate.toLocaleDateString()} - ${this.currentDate.toLocaleDateString()})`,
      value: this.lastWeekDate,
    },
    {
      name: `30 hari Terakhir (${this.lastMonthDate.toLocaleDateString()} - ${this.currentDate.toLocaleDateString()})`,
      value: this.lastMonthDate,
    },
    {
      name: `6 Bulan Terakhir (${this.last6MonthDate.toLocaleDateString()} - ${this.currentDate.toLocaleDateString()})`,
      value: this.last6MonthDate,
    },
    {
      name: `12 Bulan Terakhir (${this.lastYearDate.toLocaleDateString()} - ${this.currentDate.toLocaleDateString()})`,
      value: this.lastYearDate,
    },
  ];

  selectedDateDrpdown: DateData = this.dateDropdown[0];

  checkData() {
    console.log(this.selectedDateDrpdown.value.toLocaleDateString());
  }

  ngOnInit(): void {
    this.setDataChart();

    firstValueFrom(this.poliService.getAllPoli())
      .then((res) => {
        res.map((data) => {
          this.tabs.push({ title: data.nama, content: data.username });
        });
      })
      .catch((err) => console.log(err));

    firstValueFrom(
      this.patientService.getAllPatientWithFilterDate(this.lastWeekDate)
    )
      .then((res) => {
        console.log(res);
        const mappingData = [];
        // for (const data of res.currentData) {
        //   console.log(new Date(data.createdAt).toLocaleDateString());

        // }

        for (let i = 0; i < 7; i++) {
          console.log(
            this.weekday[
              new Date(
                this.currentDate.getTime() - i * 24 * 60 * 60 * 1000
              ).getUTCDay()
            ]
          );
          const dataFilter = res.currentData.filter(
            (d) =>
              new Date(d.createdAt).toLocaleDateString() ==
              new Date(
                this.currentDate.getTime() - i * 24 * 60 * 60 * 1000
              ).toLocaleDateString()
          );
          mappingData.push({
            data: dataFilter,
            label:
              this.weekday[
                new Date(
                  this.currentDate.getTime() - i * 24 * 60 * 60 * 1000
                ).getUTCDay()
              ],
          });
        }
        console.log(mappingData);
      })
      .catch((err) => console.log(err));
  }

  setDataChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          // yAxisID: 'y',
          tension: 0.4,
          data: [65, 59, 80, 81, 56, 55, 10],
        },
        {
          label: 'Dataset 2',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-600'),
          // yAxisID: 'y1',
          borderDash: [5, 5],
          tension: 0.4,
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
