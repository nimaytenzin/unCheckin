import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";

export interface Visitors {
  name: string;
  address:string;
  cid: string;
  contact:number;
  status:string;
}

@Component({
  selector: 'app-visitors-checkin',
  templateUrl: './visitors-checkin.component.html',
  styleUrls: ['./visitors-checkin.component.scss']
})
export class VisitorsCheckinComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'cid','contact','requestBy','action'];
  dataSource :[]
  agencyLists:[]
  checkInDisable:boolean;
  checkOutDisable:boolean;
  
  constructor(
    private dataservice:DataService,
    private dialog:MatDialog,
    private snackbar:MatSnackBar,
    private router:Router
  ) { }

  ngOnInit() {
    this.dataservice.getAllVisitors().subscribe(res=>{
      this.dataSource = res.data
    })
  }


  checkIn(e){

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '80vh',
      maxWidth: '80vh',
      data:{
        title: "Checkin?",
        message:`Check-In ${e.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.snackbar.open(`Checked in ${e.name}`, '',{
          verticalPosition:'bottom',
          duration:3000
        })        
      }else{
        this.snackbar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })

  }

  checkOut(e){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '80vh',
      maxWidth: '80vh',
      data:{
        title: "CheckOut?",
        message:`Check-Out ${e.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.snackbar.open(`Checked Out ${e.name}`, '',{
          verticalPosition:'bottom',
          duration:3000
        })        
      }else{
        this.snackbar.open(`Cancelled`, '',{
          verticalPosition:'bottom',
          duration:3000
        })   
      }
    })
  }

  getStaffLists(r){
  }

  checkIndisable(element){
    if(element.status === "checkedIn"){
      return true
    }else{
      return false
    }
  }


  addVisitors(){
    this.router.navigate(['addVisitor'])
  }

}
