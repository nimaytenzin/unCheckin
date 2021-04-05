import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";


export class Vehicle {
  car_id: number;
  staff_id:number;
  type:string;
  time: string;
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
  vehicle = new Vehicle

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
    if(this.selectDriverForm.get('selectedDriver').value === null){
      this.snackbar.open(`Please Select Driver`, '',{
        verticalPosition:'bottom',
        duration:3000
      })  
    }else{
      let driverId = this.selectDriverForm.get('selectedDriver').value
      this.vehicle.car_id = e.id,
      this.vehicle.staff_id = driverId,
      this.vehicle.time = this.clock();
      this.vehicle.type = "checked-in"

      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data:{
          title: "CheckIn?",
          message:`Check-In ${e.vnumber}?`
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if(result === true){  
          this.dataservice.logVehicle(this.vehicle).subscribe(res => {
            this.snackbar.open(`Checked In ${e.vnumber} `, '',{
              verticalPosition:'bottom',
              duration:3000
            })
            this.selectDriverForm.patchValue( {'selectedDriver':null} );  
            this.refreshData()
          })
            
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
      let driverId = this.selectDriverForm.get('selectedDriver').value
      this.vehicle.car_id = e.id,
      this.vehicle.staff_id = driverId,
      this.vehicle.time = this.clock();
      this.vehicle.type = "checked-out"
     
      
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data:{
          title: "CheckOut?",
          message:`Check-Out ${e.vnumber} ?`
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if(result === true){
          this.dataservice.logVehicle(this.vehicle).subscribe(res => {
            this.snackbar.open(`Checked Out ${e.vnumber} `, '',{
              verticalPosition:'bottom',
              duration:3000
            })
            this.selectDriverForm.patchValue( {'selectedDriver':null} );   
            this.refreshData()

          })
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

 refreshData(){
  this.dataservice.getCars().subscribe(res => {
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
