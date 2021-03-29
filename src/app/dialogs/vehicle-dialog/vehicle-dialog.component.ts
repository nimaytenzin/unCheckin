import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Data } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

export class Vehicle{
  vnumber:string;
  agency_id:number;
  status:string;
}


@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent implements OnInit {
  vehicleForm:FormGroup;
  agencyLists:[]
  vehicle = new Vehicle;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<VehicleDialogComponent>,
    public dialog: MatDialog,
    private dataservice:DataService
  ) { }

  ngOnInit() {
    this.reactiveForm();
    this.dataservice.getAllAgency().subscribe(res => {
      this.agencyLists = res.data
    })

    if(this.data.edit === true){
      this.vehicleForm.patchValue(
        {
          vnumber:this.data.vnumber,
          agency:this.data.agency_id,
        },
        )
    }



  }

  reactiveForm(){
    this.vehicleForm = this.fb.group({
      vnumber:[],
      agency:[]
    });   
  }

  submit(){
    this.vehicle.vnumber = this.vehicleForm.get('vnumber').value;
    this.vehicle.agency_id = this.vehicleForm.get('agency').value;
    if(this.data.edit !== true){
      this.vehicle.status = "checked-in"
    }
    this.dialogRef.close([this.vehicle]);
  }

  close(){
    this.vehicle.vnumber = this.vehicleForm.get('vnumber').value;
    this.vehicle.agency_id = this.vehicleForm.get('agency').value;
    this.vehicle.status = null
    this.dialogRef.close();

  }

}
