import { Component, OnInit, ViewChild , AfterViewInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
interface OPTIONS{
  name:string,
  logoPath:string
}
interface OPTIONS2{
  name:string
}

export interface PeriodicElement {
  name: string;
  agency: string;
  time: string;
  type:string;
}
let  t = new Date().getDate().toString()

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hem Bdr', agency: "UNDP", time: t, type:"CheckIn"},
  { name: 'Nima', agency: "UNDP", time: t, type:"CheckIn"}

];

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'agency','type', 'time'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  checkInForm:FormGroup;
  checkOutForm:FormGroup;
  timeNow:any;
  date:any;
  time:any;

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  workingAgencies:OPTIONS[]=[
    {name:'UNDP', logoPath:'../../assets/undp.png'},
    {name:'UNICEF', logoPath:'../../assets/un-logo.jpeg'},
    {name:'Visitors', logoPath:'../../assets/visitors.png'}
  ]

  employees:OPTIONS2[]=[
    {name:'Nima Yoezer'},
    {name:'Pema Chodron'},
    {name:'Karma Jhon'},
    {name:'Jhon F kenedy'},
    {name:'Kenny Ackerman, 1442233'}
  ]
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }



  ngOnInit() {
    this.clock()
    this.reactiveForms()
    setInterval(()=>{
      this.clock()
    }, 1000);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  reactiveForms() {
    this.checkInForm = this.fb.group({
      workingAgencyIn:[],
      employeeNameIn:[]
    }); 
    this.checkOutForm = this.fb.group({
      workingAgencyOut:[],
      employeeNameOut:[]
    });   
  }

  checkIn(){
    let name = this.checkInForm.get('employeeNameIn').value;
    let workAgency = this.checkInForm.get('workingAgencyIn').value
    let time = this.timeNow
    let text:String = name + ' working at ' + workAgency + ' checked in at ' + time


    const confirmDialog = this.dialog.open(ConfirmDialogComponent,{
      data:{
        title: "Confirm CheckIn?",
        message: `Name: ${name},Work Agency: ${workAgency}`
      }
    });
    confirmDialog.afterClosed().subscribe(result=>{
      if(result == true){
        this.snackBar.open(`${text}`, '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        })
        }else{
          this.snackBar.open(`Cancelled`, '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          })
        }
    });
  }

  clock(){
      let d = new Date();
      let date = d.getDate();
      let month = d.getMonth();
      let montharr =["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
      let m=montharr[month];
      let year = d.getFullYear();
      var day = d.getDay();
      var dayarr =["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
      let dt=dayarr[day];
      let hour =d.getHours();
      let min = d.getMinutes();
      let sec = d.getSeconds();
      let hr;

      let period = "AM";
      if (hour == 0){
        hr = 12;
      } 
      if (hour > 12) {	    
        hr = hour - 12;	    
        period = "PM";	  
      }

      this.date = dt+" "+date+" "+m+" "+year;
      this.time=hr+":"+min+":"+sec + " " + period;
  }

  checkOut(){
    let name = this.checkOutForm.get('employeeNameOut').value;
    let workAgency = this.checkOutForm.get('workingAgencyOut').value
    let time = this.timeNow
    let text:String = name + ' working at ' + workAgency + ' checked out at ' + time
    
    const confirmDialog = this.dialog.open(ConfirmDialogComponent,{
      data:{
        title: "Confirm CheckOut?",
        message: `Name: ${name},Work Agency: ${workAgency}`
      }
    });
    confirmDialog.afterClosed().subscribe(result=>{
      if(result == true){
        this.snackBar.open(`${text}`, '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        })
        }else{
          this.snackBar.open(`Cancelled`, '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          })
        }
    });
  }

}
