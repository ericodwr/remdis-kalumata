import { Component, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['breadcrumbs.styles.css'],
  standalone: true,
  imports: [SharedModule, CommonModule],
})
export class BreadcrumbsComponent implements OnInit {
  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  currentRoute: string | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        //do something on end activity
        this.breadcrumbsSetup();
      }
    });
  }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  breadcrumbsSetup() {
    const breadcrumbs: MenuItem[] = [];

    const rawRoute = this.router.url.split('%');

    let route =
      rawRoute.length > 1
        ? rawRoute[0].slice(0, -1).split('/')
        : this.router.url.split('/');

    this.currentRoute = this.router.url;

    for (let i = 0; i < route.length; i++) {
      if (i == 0) {
        breadcrumbs.push({
          icon: 'pi pi-home',
          routerLink: '/',
        });
      } else if (i == 1) {
        breadcrumbs.push({ label: route[i], routerLink: `/${route[i]}` });
      } else {
        breadcrumbs.push({
          label: route[i],
          routerLink: `${breadcrumbs[i - 1].routerLink}/${route[i]}`,
        });
      }
    }

    this.items = breadcrumbs;
  }
}
