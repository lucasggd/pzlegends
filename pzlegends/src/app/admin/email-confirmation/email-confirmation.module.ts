import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailConfirmationComponent } from './email-confirmation.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EmailConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class EmailConfirmationModule { }
