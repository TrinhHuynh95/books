import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './components/list/list.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class CartModule { }
