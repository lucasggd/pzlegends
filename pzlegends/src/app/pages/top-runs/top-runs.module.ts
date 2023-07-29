import { NgModule } from '@angular/core';
import { TopRunsComponent } from './top-runs.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RulesDialogComponent } from './rules-dialog/rules-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    TopRunsComponent,
    RulesDialogComponent,
  ],
})
export class TopRunsModule { }
