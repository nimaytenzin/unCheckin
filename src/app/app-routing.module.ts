import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { CheckInComponent } from "./check-in/check-in.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { VisitorsCheckinComponent } from './checkins/visitors-checkin/visitors-checkin.component';
import { EmployeeCheckinComponent } from './checkins/employee-checkin/employee-checkin.component';
import { VehicleCheckinComponent } from './checkins/vehicle-checkin/vehicle-checkin.component';
import { GatePassComponent } from './checkins/gate-pass/gate-pass.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkin', component: CheckInComponent},
  {path:'user-dash', component:UserDashboardComponent,
    children: [
      { path: 'employees', component:  EmployeeCheckinComponent},
      { path: 'visitors', component: VisitorsCheckinComponent },
      { path: 'vehicles', component: VehicleCheckinComponent },
      { path: 'gpass', component: GatePassComponent },



    ]},
  { path:'admin',component:DashboardComponent},
  {path: '**', component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
