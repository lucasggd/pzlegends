import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunRequestAdminComponent } from './run-request-admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RunRequestByIdComponent } from './run-request-by-id/run-request-by-id.component';

@NgModule({
  declarations: [
    RunRequestAdminComponent,
    RunRequestByIdComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule
  ]
})
export class RunRequestAdminModule { }
