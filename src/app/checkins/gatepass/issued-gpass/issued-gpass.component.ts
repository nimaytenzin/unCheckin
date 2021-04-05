import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ReviewGpassComponent } from 'src/app/dialogs/review-gpass/review-gpass.component';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../../confirm-dialog/confirm-dialog.component";
import { ViewGpassComponent } from "../../../dialogs/view-gpass/view-gpass.component";

@Component({
  selector: 'app-issued-gpass',
  templateUrl: './issued-gpass.component.html',
  styleUrls: ['./issued-gpass.component.scss']
})
export class IssuedGpassComponent implements OnInit {

  
  displayedColumns: string[] = ['index', 'issueTo', 'requestedBy','action'];

  dataSource;
  constructor(
    private dataservice:DataService,
    private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.reactiveForm()
    this.dataservice.getIssuedGpass().subscribe(res =>{
      this.dataSource = res
    })

    setInterval(()=>{
      this.refreshData()
    }, 5000)


  }

  reactiveForm(){
      
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
  this.dataservice.getIssuedGpass().subscribe(res =>{
    this.dataSource = res
  })
 }
 
 viewItems(e){
  const confirmDialog = this.dialog.open(ReviewGpassComponent, {
    data:{
      id: e.id
    }
  });
 }



 completeVerification(e){
  let gpass = {
    id:e.id,
    status :"completed"
  }
 const confirmDialog = this.dialog.open(ConfirmDialogComponent, {  
   data:{
     title: "Complete Verification?",
     message:`Please verify individual items before completing, Complete Gate Pass Verification?`
   }
 });
 confirmDialog.afterClosed().subscribe(result => {
   if(result === true){
     this.dataservice.issueGatePass(e.id,gpass).subscribe(res => {
       this.snackbar.open(`Gate Pass Verified`, '',{
         verticalPosition:'bottom',
         duration:3000
       }) 
       this.refreshData() 
     })
     
   }else{
     this.snackbar.open(`Cancelled`, '',{
       verticalPosition:'bottom',
       duration:3000
     })   
   }
 })
}


}
