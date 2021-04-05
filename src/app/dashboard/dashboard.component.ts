import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  timeNow:any;
  date:any;
  time:any;

  displayedColumns: string[] = ['position', 'name', 'agency','type', 'time'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
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

logout(){
  this.router.navigate(['login'])
}

}
