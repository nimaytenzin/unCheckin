import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { DataService } from '../service/data.service';

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
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss']
})
export class MainDashComponent implements OnInit {
  agencyCount =0;
  employeeCount = 0;
  todaysLog =0;
  displayedColumns: string[] = ['position', 'name', 'agency','type', 'time'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(
    private dataservice:DataService
  ) { }

  ngOnInit() {

    this.dataservice.getEmployeesLogToday().subscribe(res => {
      console.log(res)
    })

    this.dataservice.getAgencyCount().subscribe(res => {
      this.agencyCount = res
    })

    this.dataservice.getEmployeeCount().subscribe(res => {
      this.employeeCount = res
    })
    this.dataservice.getTodaysMovement().subscribe(res => {
      this.todaysLog = res
    })

    setInterval(() =>{ 
      this.dataservice.getTodaysMovement().subscribe(res => {
        this.todaysLog = res
        
      })
     }, 6000);
  }

}
