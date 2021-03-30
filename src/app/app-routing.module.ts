import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { VisitorsCheckinComponent } from './checkins/visitors-checkin/visitors-checkin.component';
import { EmployeeCheckinComponent } from './checkins/employee-checkin/employee-checkin.component';
import { VehicleCheckinComponent } from './checkins/vehicle-checkin/vehicle-checkin.component';
import { GatePassComponent } from './checkins/gate-pass/gate-pass.component';
import { AddVisitorsComponent } from './checkins/add-visitors/add-visitors.component';
import { AgenciesComponent } from './admin/agencies/agencies.component';
import { VisitorsComponent } from './admin/visitors/visitors.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { VehiclesComponent } from './admin/vehicles/vehicles.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import { AdminGatepassComponent } from './admin/admin-gatepass/admin-gatepass.component';
import { EmployeeLogTableComponent } from './table/employee-log-table/employee-log-table.component';
import { VisitorLogTableComponent } from './table/visitor-log-table/visitor-log-table.component';
import { VehicleLogTableComponent } from './table/vehicle-log-table/vehicle-log-table.component';
import { RequestVisitorsComponent } from './admin/request-visitors/request-visitors.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path:'user-dash', component:UserDashboardComponent,
    children: [
      { path: 'employees', component:  EmployeeCheckinComponent},
      { path: 'visitors', component: VisitorsCheckinComponent },
      { path: 'vehicles', component: VehicleCheckinComponent },
      { path: 'gpass', component: GatePassComponent },
    ]},
  { path:'admin',component:DashboardComponent,
      children:[
        { path: 'admin', component:  MainDashComponent, 
            children:[
              { path: 'employee-table', component:  EmployeeLogTableComponent},
              { path: 'visitor-table', component:  VisitorLogTableComponent},
              { path: 'vehicle-table', component:  VehicleLogTableComponent},

            ]},
        { path: 'agencies', component:  AgenciesComponent},
        { path: 'visitors', component:  VisitorsComponent},
        { path: 'employees', component:  EmployeesComponent},
        { path: 'vehicles', component:  VehiclesComponent},
        { path: 'request-visitors', component:  RequestVisitorsComponent},
        { path: 'gatepass', component:  AdminGatepassComponent}
      ]},
  { path:'addVisitor',component:AddVisitorsComponent},
  {path: '**', component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
