import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import { Roles } from 'src/app/constant/role.constant';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.styles.css'],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  imgUrl = '';
  roleCode: string | undefined = '';
  navbar: MenuItem[] | undefined;
  profile: MenuItem[] | undefined;

  dashboard = '';
  dashboardLogo = '';
  patient = '';
  patientLogo = '';
  poli = '';
  poliLogo = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.onRouteChange();
  }

  onClick(route: string): void {
    this.router.navigateByUrl(route);
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  onRouteChange(): void {
    if (this.router.url.includes('/dashboard')) {
      this.dashboard =
        'border-primary text-primary surface-100 border-round-xl';
      this.dashboardLogo = '/assets/sidebar/home-active.svg';
    } else {
      this.dashboard = 'text-gray-600';
      this.dashboardLogo = '/assets/sidebar/home.svg';
    }

    if (this.router.url.includes('/patient')) {
      this.patient = 'border-primary text-primary surface-100 border-round-xl';
      this.patientLogo = '/assets/sidebar/pasien-active.svg';
    } else {
      this.patient = 'text-gray-600';
      this.patientLogo = '/assets/sidebar/pasien.svg';
    }

    if (this.router.url.includes('/poli')) {
      this.poli = 'border-primary text-primary surface-100 border-round-xl';
      this.poliLogo = '/assets/sidebar/poli-active.svg';
    } else {
      this.poli = 'text-gray-600';
      this.poliLogo = '/assets/sidebar/poli.svg';
    }
  }
}
