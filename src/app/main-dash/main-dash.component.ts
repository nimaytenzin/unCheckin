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

  displayedColumns: string[] = ['position', 'name', 'agency','type', 'time'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  constructor(
    private dataservice:DataService
  ) { }

  ngOnInit() {
    this.dataservice.getTodaysLog().subscribe(res=>{
      console.log(res)
    })
  }

}
