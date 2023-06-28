import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'leave-history', component: LeaveHistoryComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

