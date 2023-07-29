import { NgModule } from '@angular/core';
import { TopRunsComponent } from './top-runs.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
  ],
  declarations: [
    TopRunsComponent
  ],
})
export class TopRunsModule { }
