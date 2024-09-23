import { Component } from '@angular/core';
import { SidebarModule } from '../sidebar/sidebar.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  standalone: true,
  imports: [
    SidebarModule,
    RouterModule,
    FooterComponent,
    NavbarComponent,
    SharedModule,
  ],
})
export class BaseComponent {}
