import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopRunsComponent } from './pages/top-runs/top-runs.component';
import { CommonModule } from '@angular/common';
import { TopRunsByIdComponent } from './pages/top-runs-by-id/top-runs-by-id.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SendRunComponent } from './pages/send-run/send-run.component';
import { AuthGuard } from './admin/guard/auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RunRequestAdminComponent } from './admin/pages/run-request-admin/run-request-admin.component';
import { AdminGuard } from './admin/guard/admin.guard';

const routes: Routes = [
  //
  //
  // admin //
  //
  //

  { path: 'admin/run-request', component: RunRequestAdminComponent, canActivate: [AdminGuard] },

  //
  //
  //
  //
  //

  //
  //
  // Authenticated users //
  //
  //

  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'send-run', component: SendRunComponent, canActivate: [AuthGuard] },

  //
  //
  //
  //
  //

  //
  //
  // All users //
  //
  //
  { path: 'runs/:id', component: TopRunsComponent },
  { path: 'run/:id', component: TopRunsByIdComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },

];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
