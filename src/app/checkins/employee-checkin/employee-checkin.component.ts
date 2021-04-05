import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

export class EmployeeCheckin {
  staff_id: number;
  type:string;
  time: string;
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
  employee= new EmployeeCheckin
  displayedColumns: string[] = ['index', 'name', 'role','action'];
  dataSource:[]
  agencyLists:[]

  selectAgencyForm:FormGroup

  checkInDisable:boolean;
  checkOutDisable:boolean;
  
  constructor(
    private dataservice:DataService,
    private dialog:MatDialog,
    private snackbar:MatSnackBar,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.dataservice.getAllAgency().subscribe(res=>{
      this.agencyLists=res.data;
    })
    this.reactiveForms()
    this.selectAgencyForm.controls['agency'].setValue(1)

    
    this.dataservice.getStaffsByAgency(1).subscribe(res => {
      this.dataSource = res.data
    })
  }


  reactiveForms(){
    this.selectAgencyForm = this.fb.group({
      agency:[]
    });    
  }

  clock(){

    let dates;
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() +1;
    let year = d.getFullYear();
    var day = d.getDay();
    let hour =d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    dates = year+'-'+month+'-'+date+' ' + hour+':'+min+':'+sec
    return dates
}


  checkIn(e){
    this.employee.staff_id = e.id;
    this.employee.time = this.clock();
    this.employee.type = "checked-in"
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '100vw !important',
      data:{
        title: "Checkin?",
        message:`Check-In ${e.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.dataservice.logEmployee(this.employee).subscribe(res =>{
          this.refreshData(e.agency_id)

          this.snackbar.open(`Checked In ${e.name}`, '',{
            verticalPosition:'bottom',
            duration:3000
          }) 
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
    console.log(e)
    this.employee.staff_id = e.id;
    this.employee.time = this.clock();
    this.employee.type = "checked-out";

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "CheckOut?",
        message:`Check-Out ${e.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.dataservice.logEmployee(this.employee).subscribe(res =>{
          this.refreshData(e.agency_id)
          this.snackbar.open(`Checked Out ${e.name}`, '',{
            verticalPosition:'bottom',
            duration:3000
          }) 
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

  refreshData(e){
    this.dataservice.getStaffsByAgency(e).subscribe(res=>{
      this.dataSource=res.data;
    })
  }



}
