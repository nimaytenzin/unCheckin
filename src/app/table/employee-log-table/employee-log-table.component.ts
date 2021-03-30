import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-employee-log-table',
  templateUrl: './employee-log-table.component.html',
  styleUrls: ['./employee-log-table.component.scss']
})
export class EmployeeLogTableComponent implements OnInit {
  agencyCount =0;
  employeeCount = 0;
  todaysLog =0;
  displayedColumns: string[] = ['position', 'name', 'agency','type', 'time'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(
    private dataservice:DataService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.dataservice.getEmployeesLogToday().subscribe(res => {
      console.log(res)
      this.dataSource = res.data
    })
  }

  getFirstPage(){
 
    this.dataservice.getEmployeesLogToday().subscribe(res => {
      this.http.get(`${res.first_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })
  }

  getPreviousPage(){
    this.dataservice.getEmployeesLogToday().subscribe(res => {
      this.http.get(`${res.prev_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })

  }

  getNextPage(){
    this.dataservice.getEmployeesLogToday().subscribe(res => {
      this.http.get(`${res.next_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })

  }

  getLastPage(){
    this.dataservice.getEmployeesLogToday().subscribe(res => {
      this.http.get(`${res.last_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })

  }

}
