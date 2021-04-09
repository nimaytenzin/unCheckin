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

@Component({
  selector: 'app-visitor-log-table',
  templateUrl: './visitor-log-table.component.html',
  styleUrls: ['./visitor-log-table.component.scss']
})
export class VisitorLogTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'agency','address','contact','requestedBy','type', 'time'];
  dataSource;
  
  constructor(
    private dataservice:DataService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.dataservice.getVisitorsLogToday().subscribe(res => {
      console.log(res)
      this.dataSource = res.data
    })
  }

  getFirstPage(){
 
    this.dataservice.getVisitorsLogToday().subscribe(res => {
      this.http.get<any>(`${res.first_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })
  }

  getPreviousPage(){
    this.dataservice.getVisitorsLogToday().subscribe(res => {
      this.http.get<any>(`${res.prev_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })

  }

  getNextPage(){
    this.dataservice.getVisitorsLogToday().subscribe(res => {
      this.http.get(`${res.next_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })

  }

  getLastPage(){
    this.dataservice.getVisitorsLogToday().subscribe(res => {
      this.http.get<any>(`${res.last_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })

  }

}
