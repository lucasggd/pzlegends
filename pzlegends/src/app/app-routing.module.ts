import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopRunsComponent } from './pages/top-runs/top-runs.component';
import { CommonModule } from '@angular/common';
import { TopRunsByIdComponent } from './pages/top-runs-by-id/top-runs-by-id.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';

const routes: Routes = [
  { path: 'runs', component: TopRunsComponent },
  { path: 'run/:id', component: TopRunsByIdComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
