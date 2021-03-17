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
import { CheckInComponent } from './check-in/check-in.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgencyTableComponent } from './agency-table/agency-table.component';
import { UserTableComponent } from './user-table/user-table.component';
import { RequestsComponent } from './requests/requests.component';
import { MainDashComponent } from './main-dash/main-dash.component';
import {  MatDatepickerModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    ConfirmDialogComponent,
    CheckInComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    AgencyTableComponent,
    UserTableComponent,
    RequestsComponent,
    MainDashComponent
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
    MatDatepickerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ ConfirmDialogComponent]
})
export class AppModule { }
