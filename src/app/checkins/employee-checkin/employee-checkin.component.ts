import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-checkin',
  templateUrl: './employee-checkin.component.html',
  styleUrls: ['./employee-checkin.component.scss']
})
export class EmployeeCheckinComponent implements OnInit {
  agencyLists=[
    {name:'UNICEF'},
    {name:'UNDP'},
    {name:'RCO'},
    {name:'UNFPA'},
    {name:'WFP'},
    {name:'FAO'},
    {name:'UNODC'},
    {name:'WHO'},
    {name:'WB-IFC'},
    {name:'ADB'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
