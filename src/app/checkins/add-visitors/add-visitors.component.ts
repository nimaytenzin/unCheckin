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

export class CheckInVisitor {
  visitor_id: number;
  type:string;
  time: string;
}

@Component({
  selector: 'app-add-visitors',
  templateUrl: './add-visitors.component.html',
  styleUrls: ['./add-visitors.component.scss']
})
export class AddVisitorsComponent implements OnInit {
  addVisitorForm:FormGroup;
  visitor= new Visitor;
  checkInVisitor = new CheckInVisitor
  constructor(
    public dialog: MatDialog,
    private fb:FormBuilder,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.reactiveForms()
    let g = new Date
    g.getMonth()
  
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

  addAndCheckIn(){
    let today = new Date().toString()
    this.visitor.name = this.addVisitorForm.get('visitorName').value
    this.visitor.address = this.addVisitorForm.get('visitorAddress').value
    this.visitor.cid = this.addVisitorForm.get('visitorCid').value
    this.visitor.contact = this.addVisitorForm.get('visitorContact').value
    this.visitor.agency = this.addVisitorForm.get('visitorAgency').value
    this.visitor.staff_id = 1;
    this.visitor.arrivaltime = this.clock();
    this.visitor.status = 'checked-out';

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {  
      data:{
        title: "Add Visitor?",
        message:`Add and Check-In ${this.visitor.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.dataService.postNewVisitor(this.visitor).subscribe(res =>{
          //add check in route here
          this.checkInVisitor.visitor_id = res.id;
          this.checkInVisitor.type = "checked-in";
          this.checkInVisitor.time = this.clock();
          this.dataService.logVisitor(this.checkInVisitor).subscribe(res => {    
                this.snackBar.open(`Checked In ${this.visitor.name}`, '',{
                  verticalPosition:'bottom',
                  duration:3000
              })
          }) 
          this.router.navigate(['user-dash/visitors'])
        })
        
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
