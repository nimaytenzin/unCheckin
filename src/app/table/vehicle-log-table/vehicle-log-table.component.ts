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
  selector: 'app-vehicle-log-table',
  templateUrl: './vehicle-log-table.component.html',
  styleUrls: ['./vehicle-log-table.component.scss']
})
export class VehicleLogTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'agency','type', 'time'];
  dataSource;
  
  constructor(
    private dataservice:DataService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.dataservice.getVehiclesLogToday().subscribe(res => {
      console.log(res)
      this.dataSource = res.data
    })
  }

  getFirstPage(){
 
    this.dataservice.getVehiclesLogToday().subscribe(res => {
      this.http.get<any>(`${res.first_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })
  }

  getPreviousPage(){
    this.dataservice.getVehiclesLogToday().subscribe(res => {
      if(res.prev_page_url !== null){
        alert('prev not  Null')
        this.http.get<any>(`${res.prev_page_url}`).subscribe(resp =>{
          console.log(resp)
          this.dataSource = resp.data
        }) 
      }
    })

  }

  getNextPage(){
    this.dataservice.getVehiclesLogToday().subscribe(res => {
      if(res.next_page_url !== null){
        alert('next not  Null')

        this.http.get<any>(`${res.next_page_url}`).subscribe(resp =>{
          console.log(resp)
          this.dataSource = resp.data
        })
      }  
    })

  }

  getLastPage(){
    this.dataservice.getVehiclesLogToday().subscribe(res => {
      this.http.get<any>(`${res.last_page_url}`).subscribe(resp =>{
        console.log(resp)
        this.dataSource = resp.data
      })
     
    })

  }

}
