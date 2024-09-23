import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.styles.css'],
  standalone: true,
  imports: [SharedModule, CommonModule, BreadcrumbsComponent],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  nama: string | undefined;

  dateNow = new Date();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const data = this.authService.getProfile();

    this.nama = data?.nama;
  }
}
