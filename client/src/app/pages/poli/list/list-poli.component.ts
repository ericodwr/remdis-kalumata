import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';
import { PoliResDto } from '../../../dto/poli/PoliResDto';
import { Table } from 'primeng/table';
import { PoliService } from '../../../services/poli.service';
import { firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  templateUrl: './list-poli.component.html',
  selector: 'list-poli-app',
  styleUrls: ['./list-poli.styles.css'],
})
export class ListPoliComponent implements OnInit {
  constructor(
    private title: Title,
    private poliService: PoliService,
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {
    title.setTitle('List Data Poli');
  }

  get isAdmin() {
    return this.authService.getProfile()?.role === 'admin';
  }

  loadingDelete = false;
  isModalDelete: boolean = false;
  isModalEdit: boolean = false;
  loadingEdit = false;
  poliData: PoliResDto[] = [];
  searchValue = '';

  deletePoliForm = this.fb.group({
    id: ['', Validators.required],
  });

  editPoliForm = this.fb.group({
    nama: ['', Validators.required],
    id: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getData();
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  getData() {
    firstValueFrom(this.poliService.getAllPoli())
      .then((res) => {
        this.poliData = res;
      })
      .catch((err) => console.log(err));
  }

  onEditModal(id: string, nama: string) {
    this.editPoliForm.setValue({ id, nama });
    this.isModalEdit = true;
  }

  cancelEdit() {
    this.isModalEdit = false;
    this.editPoliForm.reset();
  }

  editPoli() {
    this.loadingEdit = true;
    firstValueFrom(this.poliService.editPoli(this.editPoliForm.getRawValue()))
      .then((res) => {
        this.cancelEdit();
        this.loadingEdit = false;
        this.getData();
      })
      .catch((err) => console.log(err));
  }

  onDeleteModal(id: string) {
    this.deletePoliForm.setValue({ id });
    this.isModalDelete = true;
  }

  deletePoli() {
    if (this.deletePoliForm.valid) {
      this.loadingDelete = true;
      firstValueFrom(
        this.poliService.deletePoli(this.deletePoliForm.getRawValue().id)
      )
        .then((res) => {
          this.loadingDelete = false;
          this.isModalDelete = false;
          this.getData();
        })
        .catch((err) => {
          this.loadingDelete = false;
          console.log(err);
        });
    }
  }
}
