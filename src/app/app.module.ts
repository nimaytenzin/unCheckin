import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import {MatTabsModule} from '@angular/material/tabs';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatGridListModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSnackBarModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {WebcamModule} from 'ngx-webcam';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import {  MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { GatePassComponent } from './checkins/gate-pass/gate-pass.component';
import { EmployeeCheckinComponent } from "./checkins/employee-checkin/employee-checkin.component";
import { VehicleCheckinComponent } from "./checkins/vehicle-checkin/vehicle-checkin.component";
import {VisitorsCheckinComponent  } from "./checkins/visitors-checkin/visitors-checkin.component";
import { AddVisitorsComponent } from './checkins/add-visitors/add-visitors.component';
import { VisitorsComponent } from './admin/visitors/visitors.component';
import { EmployeesComponent } from './admin/employees/employees.component';
import { VehiclesComponent } from './admin/vehicles/vehicles.component';
import { AgenciesComponent } from './admin/agencies/agencies.component';
import { AdminGatepassComponent } from './admin/admin-gatepass/admin-gatepass.component';
import { AgencyDialogComponent } from './dialogs/agency-dialog/agency-dialog.component';
import { EmployeeDialogComponent } from './dialogs/employee-dialog/employee-dialog.component';
import { VehicleDialogComponent } from './dialogs/vehicle-dialog/vehicle-dialog.component';
import { EmployeeLogTableComponent } from './table/employee-log-table/employee-log-table.component';
import { VisitorLogTableComponent } from './table/visitor-log-table/visitor-log-table.component';
import { VehicleLogTableComponent } from './table/vehicle-log-table/vehicle-log-table.component';
import { RequestVisitorsComponent } from './admin/request-visitors/request-visitors.component';
import { GatepassTableComponent } from './admin/data-table/gatepass-table/gatepass-table.component';
import { GatepassDialogComponent } from './admin/data-table/gatepass-dialog/gatepass-dialog.component';
import { ListedGpassComponent } from './checkins/gatepass/listed-gpass/listed-gpass.component';
import { IssuedGpassComponent } from './checkins/gatepass/issued-gpass/issued-gpass.component';
import { ViewGpassComponent } from './dialogs/view-gpass/view-gpass.component';
import { ReviewGpassComponent } from './dialogs/review-gpass/review-gpass.component';
import { ListedGpassAdminComponent } from './admin/listed-gpass-admin/listed-gpass-admin.component';
import { IssuedGpassAdminComponent } from './admin/issued-gpass-admin/issued-gpass-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    ConfirmDialogComponent,
    DashboardComponent,
    MainDashComponent,
    UserDashboardComponent,
    GatePassComponent,
    EmployeeCheckinComponent,
    VehicleCheckinComponent,
    VisitorsCheckinComponent,
    AddVisitorsComponent,
    VisitorsComponent,
    EmployeesComponent,
    VehiclesComponent,
    AgenciesComponent,
    AdminGatepassComponent,
    AgencyDialogComponent,
    EmployeeDialogComponent,
    VehicleDialogComponent,
    EmployeeLogTableComponent,
    VisitorLogTableComponent,
    VehicleLogTableComponent,
    RequestVisitorsComponent,
    GatepassTableComponent,
    GatepassDialogComponent,
    ListedGpassComponent,
    IssuedGpassComponent,
    ViewGpassComponent,
    ReviewGpassComponent,
    ListedGpassAdminComponent,
    IssuedGpassAdminComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatListModule,
    MatCheckboxModule,
    WebcamModule,
    MatTabsModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
  
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ ConfirmDialogComponent,AgencyDialogComponent,EmployeeDialogComponent,VehicleDialogComponent,GatepassDialogComponent,ViewGpassComponent,ReviewGpassComponent],
})
export class AppModule { }
