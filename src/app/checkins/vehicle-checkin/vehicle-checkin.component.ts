import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
export interface Visitors {
  carNumber: string;
  status:string;
}



const ELEMENT_DATA: Visitors[] = [
  { carNumber: 'BP-1A-1234', status:"check-in" },
  { carNumber: 'BP-1-3001', status:"check-out"},
  { carNumber: 'BP-1A-1234',status:"check-in"},
  { carNumber: 'BP-2-4234', status:"check-out"},
];
@Component({
  selector: 'app-vehicle-checkin',
  templateUrl: './vehicle-checkin.component.html',
  styleUrls: ['./vehicle-checkin.component.scss']
})
export class VehicleCheckinComponent implements OnInit {
  displayedColumns: string[] = ['index', 'carNumber', 'driver','action'];
  dataSource = ELEMENT_DATA;
  agencyLists:[]

  ruleGroupColumns: String[] = [
    'MERGE',
    'FACILITY',
    'COMPANY'
  ];
  columnFormControl = new FormControl(this.ruleGroupColumns);

  checkInDisable:boolean;
  checkOutDisable:boolean;
  constructor() { }

  ngOnInit() {
  }

  checkIn(e){
    console.log('CHECKIN',e.name)
  }

  checkOut(e){
    console.log('CHECKooUT',e.name)
  }

  getStaffLists(r){
    //dynamically set the data source to the table
    
    console.log(r)


  }

  checkIndisable(element){
    if(element.status === "check-in"){
      return true
    }else{
      return false
    }
  }

  get displayColumns() {
    return this.columnFormControl.value;
  }


}
