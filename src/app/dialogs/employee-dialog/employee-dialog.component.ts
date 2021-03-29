import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/service/data.service';

export class Employee{
  name:string;
  contact:string;
  agency_id:number;
  role:string;
  cid:string;
  status:string;

}

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {
  employeeForm:FormGroup;
  employee = new Employee;
  agencyLists:[];
  roles=[
    {name:'staff'},
    {name:'driver'}
  ]
  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataservice:DataService


  ) { }

  ngOnInit() {
    this.reactiveForm()
    this.getAgencyName(1)
    this.dataservice.getAllAgency().subscribe(res => {
      this.agencyLists = res.data
    })
    if(this.data.edit === true){
      this.employeeForm.patchValue(
        {
          name:this.data.name,
          cid:this.data.cid,
          contact:this.data.contact,
          agency:this.data.agency_id,
          role:this.data.role
        },
        )
    }

  }


  reactiveForm(){
    this.employeeForm = this.fb.group({
      name:[],
      agency:[],
      role:[],
      contact:[],
      cid:[],
    });   
  }

  getAgencyName(id){
   console.log('asdsd',this.agencyLists)
  }

  submit(){
    this.employee.name = this.employeeForm.get('name').value;
    this.employee.contact = this.employeeForm.get('contact').value;
    this.employee.role = this.employeeForm.get('role').value;
    this.employee.agency_id = this.employeeForm.get('agency').value;
    this.employee.cid = this.employeeForm.get('cid').value
    if(this.data.edit !== true){
      this.employee.status = "checked-in"
    }
    this.dialogRef.close([this.employee]);
  }

  close(){
    this.dialogRef.close();

  }

}
