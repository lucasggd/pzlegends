import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunRequestAdminComponent } from './run-request-admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    RunRequestAdminComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatTableModule
  ]
})
export class RunRequestAdminModule { }
