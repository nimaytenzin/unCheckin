import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  timeNow:any;
  date:any;
  time:any;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {

    setInterval(()=>{
      this.clock()
    }, 1000);
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
    }else{
      hr = hour
    }

    this.date = dt+" "+date+" "+m+" "+year;
    this.time=hr+":"+min+":"+sec + " " + period;
}




}
