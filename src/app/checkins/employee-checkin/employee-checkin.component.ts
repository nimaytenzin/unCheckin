import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';



export interface PeriodicElement {
  id:number;
  agency_id:number
  name: string;
  role: string;
  status:string;
  created_at:string;
  updated_at:string
}



// const ELEMENT_DATA: PeriodicElement[] = [
//   { name: 'Hem Dorji', role: "Driver",status:"checkedIn" },
//   { name: 'Kennny Bdr', role: "Staff",status:"checkedIn"},
//   { name: 'Sonam Eden Rai',role: "Driver",status:"checkedIn"},
//   { name: 'Kinley Chettri', role:"Staff",status:"checkedOut"},
//   { name: 'Boron', role: "Driver",status:"checkedIn"},
// ];

@Component({
  selector: 'app-employee-checkin',
  templateUrl: './employee-checkin.component.html',
  styleUrls: ['./employee-checkin.component.scss']
})
export class EmployeeCheckinComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'role','action'];
  dataSource:[]
  agencyLists:[]

  checkInDisable:boolean;
  checkOutDisable:boolean;
  
  constructor(
    private dataservice:DataService
  ) { }

  ngOnInit() {
    this.dataservice.getAllAgency().subscribe(res=>{
      this.agencyLists=res.data;
      console.log('agency Lists', this.agencyLists)
    })

   

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

    this.dataservice.getStaffsByAgency(r.id).subscribe(res => {
      console.log(res)
      this.dataSource = res.data
    })


  }

  checkIndisable(element){
    if(element.status === "check-in"){
      return true
    }else{
      return false
    }
  }



}
