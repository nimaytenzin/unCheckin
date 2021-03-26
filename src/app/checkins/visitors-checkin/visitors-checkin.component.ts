import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
export interface Visitors {
  name: string;
  address:string;
  cid: string;
  contact:number;
  status:string;
}

// const ELEMENT_DATA: Visitors[] = [
//   { name: 'Hem Dorji', cid: "Driver",contact: 17552321, status:"checkedIn" },
//   { name: 'Kennny Bdr', cid: "Staff",contact: 17552321,status:"checkedIn"},
//   { name: 'Sonam Eden Rai',cid: "Driver",contact: 17552321,status:"checkedIn"},
//   { name: 'Kinley Chettri', cid:"Staff",contact: 17552321,status:"checkedOut"},
// ];


@Component({
  selector: 'app-visitors-checkin',
  templateUrl: './visitors-checkin.component.html',
  styleUrls: ['./visitors-checkin.component.scss']
})
export class VisitorsCheckinComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'cid','contact','requestBy','action'];
  dataSource :[]
  agencyLists:[]

  checkInDisable:boolean;
  checkOutDisable:boolean;
  
  constructor(
    private dataservice:DataService
  ) { }

  ngOnInit() {
    this.dataservice.getAllVisitors().subscribe(res=>{
      console.log(res)
      this.dataSource = res.data
    })
  }


  checkIn(e){
    console.log('CHECKIN',e.name)
  }

  checkOut(e){
    console.log('CHECKooUT',e.name)
  }

  getStaffLists(r){
    console.log(r)
  }

  checkIndisable(element){
    if(element.status === "checkedIn"){
      return true
    }else{
      return false
    }
  }


  addVisitors(){
    alert("redirect to add new user dialog box")
  }

}
