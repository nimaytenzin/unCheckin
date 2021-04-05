import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../../confirm-dialog/confirm-dialog.component";
import { ViewGpassComponent } from "../../../dialogs/view-gpass/view-gpass.component";


@Component({
  selector: 'app-listed-gpass',
  templateUrl: './listed-gpass.component.html',
  styleUrls: ['./listed-gpass.component.scss']
})
export class ListedGpassComponent implements OnInit {

  displayedColumns: string[] = ['index', 'issueTo', 'purpose','requestedBy','action'];

  dataSource;
  constructor(
    private dataservice:DataService,
    private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.reactiveForm()
    this.dataservice.getListedGpass().subscribe(res =>{
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
  this.dataservice.getListedGpass().subscribe(res =>{
    this.dataSource = res
  })
 }
 
 viewItems(e){
  const confirmDialog = this.dialog.open(ViewGpassComponent, {
    data:{
      id: e.id
    }
  });
 }

 issueItems(e){
   let gpass = {
     id:e.id,
     status :"issued"
   }
  const confirmDialog = this.dialog.open(ConfirmDialogComponent, {  
    data:{
      title: "Issue Gate Pass?",
      message:`Issue Gate Pass?`
    }
  });
  confirmDialog.afterClosed().subscribe(result => {
    if(result === true){
      this.dataservice.issueGatePass(e.id,gpass).subscribe(res => {
        this.snackbar.open(`Gate Pass Issued`, '',{
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
