import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TopRunsModule } from './pages/top-runs/top-runs.module';
import { TopRunsByIdModule } from './pages/top-runs-by-id/top-runs-by-id.module';
import { ContactModule } from './pages/contact/contact.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarModule } from './layout/navbar/navbar.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginModule } from './admin/login/login.module';
import { AuthInterceptor } from './admin/interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NavbarModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    TopRunsModule,
    TopRunsByIdModule,
    ContactModule,
    LoginModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
