import { Component, OnInit } from '@angular/core';
import { MatDialog,MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";

export interface PeriodicElement {
  id:number;
  agency_id:number
  name: string;
  role: string;
  status:string;
  created_at:string;
  updated_at:string
}

export interface Checkin{
  staff_id:number;
  type:string;
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
    private dataservice:DataService,
    private dialog:MatDialog,
    private snackbar:MatSnackBar
  ) { }

  ngOnInit() {
    this.dataservice.getAllAgency().subscribe(res=>{
      this.agencyLists=res.data;
      console.log('agency Lists', this.agencyLists)
    })
  }

  checkIn(e){
    console.log('CHECKIN',e.name)

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '100vw !important',
      data:{
        title: "Checkin?",
        message:`Check-In ${e.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.snackbar.open(`Checked in ${e.name}`, '',{
          verticalPosition:'bottom',
          duration:3000
        })        
      }else{
        this.snackbar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })

  }

  checkOut(e){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "CheckOut?",
        message:`Check-Out ${e.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.snackbar.open(`Checked Out ${e.name}`, '',{
          verticalPosition:'bottom',
          duration:3000
        })        
      }else{
        this.snackbar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })
  }

  getStaffLists($event){
    //dynamically set the data source to the table
    
    console.log($event)

    this.dataservice.getStaffsByAgency($event.value).subscribe(res => {
      this.dataSource = res.data
    })


  }

  checkIndisable(element){
    if(element.status === "checked-in"){
      return true
    }else{
      return false
    }
  }



}
