import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { AddComponent } from './components/add/add.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class BookModule { }
