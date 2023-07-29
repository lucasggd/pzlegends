import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopRunsByIdComponent } from './top-runs-by-id.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    TopRunsByIdComponent,
    ReportDialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatDialogModule
  ]
})
export class TopRunsByIdModule { }
