import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { Visitor } from '../add-visitors/add-visitors.component';

export class Visitors {
  visitor_id: number;
  type:string;
  time: string;
}

export class Checkin{
  visitor_id:number;
  type:string;
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
  visitor = new  Visitors
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
      console.log(res.data)
    })
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

  refreshData(){
    this.dataservice.getAllVisitors().subscribe(res=>{
      this.dataSource = res.data
    })
  }



  checkIn(e){
    this.visitor.visitor_id = e.id;
    this.visitor.time = this.clock();
    this.visitor.type = "checked-in"
    console.log(this.visitor)

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
        this.dataservice.logVisitor(this.visitor).subscribe(res => {
          console.log(res)
          this.refreshData()
        })
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
    this.visitor.visitor_id = e.id;
    this.visitor.time = this.clock();
    this.visitor.type = "checked-out"
    console.log(this.visitor);
    
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
        this.dataservice.logVisitor(this.visitor).subscribe(res => {
          console.log(res)
          this.refreshData()
        })
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

  getStaffLists(r){
  }

  checkIndisable(element){
    if(element.status === "checked-in"){
      return true
    }else{
      return false
    }
  }


  addVisitors(){
    this.router.navigate(['addVisitor'])
  }

}
