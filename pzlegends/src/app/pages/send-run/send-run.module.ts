import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendRunComponent } from './send-run.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SendRunComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SendRunModule { }
