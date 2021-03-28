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
  requesttime:string;
  staff_id:number;
}

@Component({
  selector: 'app-add-visitors',
  templateUrl: './add-visitors.component.html',
  styleUrls: ['./add-visitors.component.scss']
})
export class AddVisitorsComponent implements OnInit {
  addVisitorForm:FormGroup;
  visitor= new Visitor;
  constructor(
    public dialog: MatDialog,
    private fb:FormBuilder,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.reactiveForms()
  
  }

  reactiveForms(){
    this.addVisitorForm = this.fb.group({
      visitorName:[],
      visitorCid:[],
      visitorContact:[],
      visitorAddress:[],
      visitorAgency:[]
    });    
  }

  addAndCheckIn(){
    let today = new Date().toISOString().slice(0, 10)
    this.visitor.name = this.addVisitorForm.get('visitorName').value
    this.visitor.address = this.addVisitorForm.get('visitorAddress').value
    this.visitor.cid = this.addVisitorForm.get('visitorCid').value
    this.visitor.contact = this.addVisitorForm.get('visitorContact').value
    this.visitor.agency = this.addVisitorForm.get('visitorAgency').value
    this.visitor.staff_id = null;
    this.visitor.requesttime = today

    console.log(this.visitor)


    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      
      data:{
        title: "Add Visitor?",
        message:`Add and Check-In ${this.visitor.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.snackBar.open(`Checked In ${this.visitor.name}`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
        this.router.navigate(['user-dash/visitors'])
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

}
