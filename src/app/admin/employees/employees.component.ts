import { Component, OnInit } from '@angular/core';
import { MatDialog,MatSnackBar } from '@angular/material';
import { AgencyDialogComponent } from 'src/app/dialogs/agency-dialog/agency-dialog.component';
import { EmployeeDialogComponent } from 'src/app/dialogs/employee-dialog/employee-dialog.component';
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

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

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
    })
  }

  refreshData(id){
    this.dataservice.getStaffsByAgency(id).subscribe(res => {
      this.dataSource = res.data
    })
  }

  editEmployee(e){
    const confirmDialog = this.dialog.open(EmployeeDialogComponent, {
      data:{
        title: "Edit Employee Details",
        name:e.name,
        contact:e.contact,
        cid:e.cid,
        role:e.role,
        agency_id:e.agency_id,
        edit:true
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result !== null){
       this.dataservice.updateEmployee(e.id, result[0]).subscribe(res => {
        this.snackbar.open(`Updated`, '',{
          verticalPosition:'bottom',
          duration:3000
        })
        let id = sessionStorage.getItem('selectedAgency')
        this.refreshData(id)
       })
       
      }else{
        this.snackbar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })
  }

  deleteEmployee(e){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "Delete Employee?",
        message:`Delete ${e.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      this.dataservice.deleteEmployee(e.id).subscribe(res => {
        if(result === true){
          let id = sessionStorage.getItem('selectedAgency')
          this.refreshData(id)  
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
      
    })
  }

  getStaffLists($event){
    sessionStorage.setItem('selectedAgency', $event.value)
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

  addEmployee(){
    const confirmDialog = this.dialog.open(EmployeeDialogComponent, {
      data:{
        title: "Add New Employee"
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      console.log(result)
      if(result !== null){
        this.dataservice.addNewEmployee(result[0]).subscribe(res => {
          console.log(res)
        })
        console.log(result)
      }else{
        this.snackbar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })
  }



}
