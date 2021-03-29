import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { VehicleDialogComponent } from 'src/app/dialogs/vehicle-dialog/vehicle-dialog.component';
import { DataService } from 'src/app/service/data.service';
import {ConfirmDialogComponent  } from "../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  displayedColumns: string[] = ['index', 'vnumber','agency','actions'];
  dataSource;

  constructor(
    private dataservice:DataService,
    private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.dataservice.getCars().subscribe(res => {
      this.dataSource = res.data 
      console.log(res.data) 
    })
  }

  

  refreshData(){
    this.dataservice.getCars().subscribe(res => {
      this.dataSource = res.data  
    })
  }

  addVehicle(){
    const confirmDialog = this.dialog.open(VehicleDialogComponent, {
      data:{
        title: "Add New Agency"
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      console.log('dd',result[0])
      if(result !== null){
        console.log('dd',result[0])
        this.dataservice.postVehicle(result[0]).subscribe(res => {
          this.snackbar.open(`Checked Out `, '',{
            verticalPosition:'bottom',
            duration:3000
          }) 
          this.refreshData()
        })     
      }else{
        this.snackbar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })
  }

  editVehicle(e){
    const confirmDialog = this.dialog.open(VehicleDialogComponent, {
      data:{
        title: "Edit Vehicle",
        vnumber:e.vnumber,
        edit:true,
        id:e.id,
        agency_id:e.agency_id
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result !== null){
        console.log('sdsd',result)
        this.dataservice.updateVehicle(e.id,result[0]).subscribe(res => {
          this.snackbar.open(`Updated `, '',{
            verticalPosition:'bottom',
            duration:3000
          }) 
          this.refreshData()
        })     
      }else{
        this.snackbar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })
  }

  deleteVehicle(e){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "Delete?",
        message:`Delete Vehicle ${e.vnumber}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
      this.dataservice.deleteVehicle(e.id).subscribe(res => {
        this.snackbar.open(`Deleted`, '',{
          verticalPosition:'bottom',
          duration:3000
        })  
        this.refreshData()
      })
      }else{
        this.snackbar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })
  }


  

}
