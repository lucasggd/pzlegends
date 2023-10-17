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
import { SendRunModule } from './pages/send-run/send-run.module';
import { HomeModule } from './pages/home/home.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { UserProfileModule } from './pages/user-profile/user-profile.module';
import { AdminNavbarModule } from './admin/layout/admin-navbar/admin-navbar.module';
import { RunRequestAdminModule } from './admin/pages/run-request-admin/run-request-admin.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailConfirmationModule } from './admin/email-confirmation/email-confirmation.module';
import { RegisterModule } from './admin/register/register.module';
import { TranslocoRootModule } from './transloco-root.module';
import { ResetPasswordModule } from './admin/reset-password/reset-password.module';
import { MessageService } from './abstract/message.service';

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
    HttpClientModule,
    AdminNavbarModule,
    TopRunsModule,
    TopRunsByIdModule,
    ContactModule,
    LoginModule,
    RegisterModule,
    SendRunModule,
    HomeModule,
    NavbarModule,
    UserProfileModule,
    RunRequestAdminModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    EmailConfirmationModule,
    TranslocoRootModule,
    ResetPasswordModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
