import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [RouterModule, CommonModule, SharedModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
