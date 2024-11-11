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

  // Chart Preferences
  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
  data: any;
  options: any;
  // Chart Preferences

  dateDropdown: DateData[] = [
    {
      name: `7 hari Terakhir (${this.lastWeekDate.toLocaleDateString(
        'id-ID'
      )} - ${this.currentDate.toLocaleDateString('id-ID')})`,
      value: this.lastWeekDate,
    },
    {
      name: `30 hari Terakhir (${this.lastMonthDate.toLocaleDateString(
        'id-ID'
      )} - ${this.currentDate.toLocaleDateString('id-ID')})`,
      value: this.lastMonthDate,
    },
    {
      name: `6 Bulan Terakhir (${this.last6MonthDate.toLocaleDateString(
        'id-ID',
        {
          month: 'short',
          year: 'numeric',
        }
      )} - ${this.currentDate.toLocaleDateString('id-ID', {
        month: 'short',
        year: 'numeric',
      })})`,
      value: this.last6MonthDate,
    },
    {
      name: `12 Bulan Terakhir (${this.lastYearDate.toLocaleDateString(
        'id-ID',
        {
          month: 'short',
          year: 'numeric',
        }
      )} - ${this.currentDate.toLocaleDateString('id-ID', {
        month: 'short',
        year: 'numeric',
      })})`,
      value: this.lastYearDate,
    },
  ];

  selectedDateDrpdown: DateData = this.dateDropdown[1];

  filteringDataByDatetime(dataApi: any, time: string) {
    const mappingData: any[] = [];
    if (time == '7') {
      for (let i = 0; i < 7; i++) {
        const dataFilter = dataApi.data.filter(
          (d: any) =>
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
      this.data = {
        labels: mappingData.map((d) => d.label).reverse(),
        datasets: [
          {
            label: 'Kunjungan Pasien',
            fill: false,
            borderColor: this.documentStyle.getPropertyValue('--green-500'),
            // yAxisID: 'y',
            tension: 0.4,
            data: mappingData.map((d) => d.data.length).reverse(),
          },
        ],
      };
    } else if (time == '30') {
      for (let i = 0; i <= 30; i += 6) {
        const dataFilter = dataApi.data.filter((d: any) => {
          return (
            new Date(d.createdAt) <
              new Date(this.currentDate.getTime() - i * 24 * 60 * 60 * 1000) &&
            new Date(d.createdAt) >=
              new Date(
                this.currentDate.getTime() - (i + 6) * 24 * 60 * 60 * 1000
              )
          );
        });

        mappingData.push({
          data: dataFilter,
          label: new Date(
            this.currentDate.getTime() - i * 24 * 60 * 60 * 1000
          ).toLocaleDateString('id-ID'),
        });
      }
      this.data = {
        labels: mappingData.map((d) => d.label).reverse(),
        datasets: [
          {
            label: 'Kunjungan Pasien',
            fill: false,
            borderColor: this.documentStyle.getPropertyValue('--green-500'),
            // yAxisID: 'y',
            tension: 0.4,
            data: mappingData.map((d) => d.data.length).reverse(),
          },
        ],
      };
    } else if (time == '6') {
      for (let i = 0; i <= 180; i += 30) {
        const dataFilter = dataApi.data.filter(
          (d: any) =>
            new Date(d.createdAt).getUTCMonth() ==
            new Date(
              this.currentDate.getTime() - i * 24 * 60 * 60 * 1000
            ).getUTCMonth()
        );

        mappingData.push({
          data: dataFilter,
          label: new Date(
            this.currentDate.getTime() - i * 24 * 60 * 60 * 1000
          ).toLocaleString('default', { month: 'long' }),
        });
      }

      this.data = {
        labels: mappingData.map((d) => d.label).reverse(),
        datasets: [
          {
            label: 'Kunjungan Pasien',
            fill: false,
            borderColor: this.documentStyle.getPropertyValue('--green-500'),
            // yAxisID: 'y',
            tension: 0.4,
            data: mappingData.map((d) => d.data.length).reverse(),
          },
        ],
      };
    } else if (time == '12') {
      for (let i = 0; i < 365; i += 30) {
        const dataFilter = dataApi.data.filter(
          (d: any) =>
            new Date(d.createdAt).getUTCMonth() ==
            new Date(
              this.currentDate.getTime() - i * 24 * 60 * 60 * 1000
            ).getUTCMonth()
        );
        mappingData.push({
          data: dataFilter,
          label: new Date(
            this.currentDate.getTime() - i * 24 * 60 * 60 * 1000
          ).toLocaleString('default', { month: 'long' }),
        });
      }
      this.data = {
        labels: mappingData.map((d) => d.label).reverse(),
        datasets: [
          {
            label: 'Kunjungan Pasien',
            fill: false,
            borderColor: this.documentStyle.getPropertyValue('--green-500'),
            // yAxisID: 'y',
            tension: 0.4,
            data: mappingData.map((d) => d.data.length).reverse(),
          },
        ],
      };
    }
  }

  checkData() {
    const selectedTime = this.selectedDateDrpdown.name.split(' ')[0];

    firstValueFrom(
      this.patientService.getAllPatientWithFilterDate(
        this.selectedDateDrpdown.value
      )
    )
      .then((res) => {
        console.log(res);
        this.filteringDataByDatetime(res, selectedTime);
      })
      .catch((err) => console.log(err));
  }

  getData() {
    firstValueFrom(this.poliService.getAllPoli())
      .then((res) => {
        res.map((data) => {
          this.tabs.push({ title: data.nama, content: data.username });
        });
      })
      .catch((err) => console.log(err));

    firstValueFrom(
      this.patientService.getAllPatientWithFilterDate(
        this.dateDropdown[1].value
      )
    )
      .then((res) => {
        this.filteringDataByDatetime(res, '30');
      })
      .catch((err) => console.log(err));
  }

  ngOnInit(): void {
    this.setDataChart();

    this.getData();
  }

  setDataChart() {
    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: this.textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
