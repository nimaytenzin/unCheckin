import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";



export class GatePassItem{
  staff_id:number;
  agency:string;
  purpose:string;
  issue_date:string;
  status:string;
  items:[]
}


@Component({
  selector: 'app-admin-gatepass',
  templateUrl: './admin-gatepass.component.html',
  styleUrls: ['./admin-gatepass.component.scss']
})
export class AdminGatepassComponent implements OnInit {
  requestVisitorForm:FormGroup;
  agencyLists:[]
  staffLists:[]
  gatePass = new GatePassItem

  constructor(
    public dialog: MatDialog,
    private fb:FormBuilder,
    private dataservice: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.reactiveForms()
    this.dataservice.getAllAgency().subscribe(res=>{
      this.agencyLists=res.data;
    })
  }

  clock(d){

    let dates;
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

  reactiveForms(){
    this.requestVisitorForm = this.fb.group({
      requestAgency:[],
      requestEmployee:[],
      agencyIssuedTo:[],
      purpose:[],
      issueDate:[]
    });    
  }


  requestVisitor(){

    this.gatePass.staff_id =  this.requestVisitorForm.get('requestEmployee').value;
    this.gatePass.agency = this.requestVisitorForm.get('agencyIssuedTo').value;
    this.gatePass.purpose = this.requestVisitorForm.get('purpose').value;
    this.gatePass.issue_date = this.clock( this.requestVisitorForm.get('issueDate').value)
    this.gatePass.items = this.dataservice.gatePassItems;
    this.gatePass.status = "listed";

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {  
      data:{
        title: "List Gatepass?",
        message:`Add?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.dataservice.postGatePass(this.gatePass).subscribe(res =>{
          this.snackBar.open(`Listed `, '',{
            verticalPosition:'bottom',
            duration:3000
          }) 
        })
        this.requestVisitorForm.reset()
        this.dataservice.gatePassItems = null
      }else{
        this.snackBar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })
  }

  goBack(){
    this.router.navigate(['user-dash/visitors'])
  }

  getStaff(e ){
    this.dataservice.getStaffsByAgency(e.value).subscribe(res => {
      this.staffLists = res.data;
    })
  }
}
