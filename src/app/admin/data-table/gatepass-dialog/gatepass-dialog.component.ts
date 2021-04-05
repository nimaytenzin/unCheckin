import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';

export interface Items {
  gid:number;
  name: string;
  quantity: number;
  returnable:boolean;
  status:string
}

export interface DropDownOptions{
  id:number,
  name:string
}

export interface BooleanDropDown{
  name:string,
  value:boolean
}

@Component({
  selector: 'app-gatepass-dialog',
  templateUrl: './gatepass-dialog.component.html',
  styleUrls: ['./gatepass-dialog.component.scss']
})
export class GatepassDialogComponent {
  showDetails:boolean=false;
  action:string;
  local_data:any;
  selectionType: any;


  returnable:BooleanDropDown[]=[
    {name:'Yes', value: true},
    {name:'No', value: false}
  ]



  constructor(
    public dialogRef: MatDialogRef<GatepassDialogComponent>,
    public dataService: DataService,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Items) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    this.local_data.type = this.selectionType
    console.log(this.local_data)
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }



}
