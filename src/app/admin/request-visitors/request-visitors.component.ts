import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";

export class Visitor{
  name: string;
  cid: string;
  contact:number;
  address:string;
  agency:string;
  arrivaltime:string;
  staff_id:number;
  status:string;
}

@Component({
  selector: 'app-request-visitors',
  templateUrl: './request-visitors.component.html',
  styleUrls: ['./request-visitors.component.scss']
})
export class RequestVisitorsComponent implements OnInit {

  requestVisitorForm:FormGroup;
  agencyLists:[]
  staffLists:[]
  visitor =new Visitor
  disableForm = false

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
      visitorName:[],
      visitorCid:[],
      visitorContact:[],
      visitorAddress:[],
      visitorAgency:[],
      arrivalDate:[]
    });    
  }


  requestVisitor(){
    this.visitor.name = this.requestVisitorForm.get('visitorName').value
    this.visitor.cid = this.requestVisitorForm.get('visitorCid').value
    this.visitor.contact = this.requestVisitorForm.get('visitorContact').value
    this.visitor.address = this.requestVisitorForm.get('visitorAddress').value
    this.visitor.agency = this.requestVisitorForm.get('visitorAgency').value
    this.visitor.staff_id = this.requestVisitorForm.get('requestEmployee').value
    this.visitor.arrivaltime = this.clock(this.requestVisitorForm.get('arrivalDate').value)
    this.visitor.status = 'checked-out';

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {  
      data:{
        title: "Add Visitor?",
        message:`Add  ${this.visitor.name} to request list?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.dataservice.postNewVisitor(this.visitor).subscribe(res =>{
          this.snackBar.open(`Added ${this.visitor.name}`, '',{
            verticalPosition:'bottom',
            duration:3000
          }) 
        })
        this.requestVisitorForm.reset()
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
