import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunRequestAdminComponent } from './run-request-admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RunRequestByIdComponent } from './run-request-by-id/run-request-by-id.component';
import { RefusedDialogComponent } from './refused-dialog/refused-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RunRequestAdminComponent,
    RunRequestByIdComponent,
    RefusedDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class RunRequestAdminModule { }
