import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
export interface Visitors {
  carNumber: string;
  status:string;
}


export interface Checkin{
  car_id:number;
  type:string;
}

@Component({
  selector: 'app-vehicle-checkin',
  templateUrl: './vehicle-checkin.component.html',
  styleUrls: ['./vehicle-checkin.component.scss']
})
export class VehicleCheckinComponent implements OnInit {
  displayedColumns: string[] = ['index', 'carNumber', 'driver','action'];
  selectDriverForm:FormGroup;
  dataSource;
  agencyLists:[]
  driverLists:[]
  driver = new FormControl()
 
  checkInDisable:boolean;
  checkOutDisable:boolean;
  constructor(
    private dataservice:DataService,
    private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.reactiveForm()
    this.dataservice.getCars().subscribe(res => {
      this.dataSource = res.data
    })
    this.dataservice.getDrivers().subscribe(res => {
      this.driverLists = res.data

    })

  }

  reactiveForm(){
    this.selectDriverForm = this.fb.group({
      selectedDriver:[],
    });    
  }

  checkIn(e){

    if(this.selectDriverForm.get('selectedDriver').value === null){
      this.snackbar.open(`Please Select Driver`, '',{
        verticalPosition:'bottom',
        duration:3000
      })  
    }else{
      let driverName = this.selectDriverForm.get('selectedDriver').value
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data:{
          title: "CheckIn?",
          message:`Check-In ${e.vnumber}, Driver: ${driverName}?`
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if(result === true){
          this.snackbar.open(`Checked In ${e.vnumber}, driver: ${driverName}`, '',{
            verticalPosition:'bottom',
            duration:3000
          })
          this.selectDriverForm.patchValue( {'selectedDriver':null} );      
        }else{
          this.snackbar.open(`Cancelled`, '',{
            verticalPosition:'bottom',
            duration:3000
          })
          this.selectDriverForm.patchValue( {'selectedDriver':null} ); 
        }
      })
    }

    
  }

  checkOut(e){
    if(this.selectDriverForm.get('selectedDriver').value === null){
      this.snackbar.open(`Please Select Driver`, '',{
        verticalPosition:'bottom',
        duration:3000
      })  
    }else{
      let driverName = this.selectDriverForm.get('selectedDriver').value
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data:{
          title: "CheckOut?",
          message:`Check-Out ${e.vnumber}, Driver: ${driverName}?`
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if(result === true){
          this.snackbar.open(`Checked Out ${e.vnumber}, driver: ${driverName}`, '',{
            verticalPosition:'bottom',
            duration:3000
          })
          this.selectDriverForm.patchValue( {'selectedDriver':null} );      
        }else{
          this.snackbar.open(`Cancelled`, '',{
            verticalPosition:'bottom',
            duration:3000
          })
          this.selectDriverForm.patchValue( {'selectedDriver':null} ); 
        }
      })
    }
  }

  getStaffLists(r){
    //dynamically set the data source to the table
  }

  checkIndisable(element){
    if(element.status === "checked-in"){
      return true
    }else{
      return false
    }
  }



}
