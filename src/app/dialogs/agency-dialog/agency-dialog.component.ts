import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export class Agency{
  name:string
}

@Component({
  selector: 'app-agency-dialog',
  templateUrl: './agency-dialog.component.html',
  styleUrls: ['./agency-dialog.component.scss']
})
export class AgencyDialogComponent implements OnInit {
  title: string;
  name: string;
  edit:boolean;
  id:number;

  agencyForm:FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<AgencyDialogComponent>,
    public dialog: MatDialog

  ) { }

  ngOnInit() {
    this.reactiveForm()
    if(this.data.edit === true){
      this.agencyForm.patchValue({name:this.data.name})
    }
  }

  reactiveForm(){
    this.agencyForm = this.fb.group({
      name:[]
    });   
  }

  submit(){
    this.dialogRef.close([this.agencyForm.value]);
  }

  close(){
    console.log(this.data)
    this.dialogRef.close();

  }
}
