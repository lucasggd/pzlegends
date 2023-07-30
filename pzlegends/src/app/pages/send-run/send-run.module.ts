import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendRunComponent } from './send-run.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    SendRunComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class SendRunModule { }
