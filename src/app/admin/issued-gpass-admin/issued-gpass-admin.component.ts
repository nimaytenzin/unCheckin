import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { ViewGpassComponent } from "../../dialogs/view-gpass/view-gpass.component";

@Component({
  selector: 'app-issued-gpass-admin',
  templateUrl: './issued-gpass-admin.component.html',
  styleUrls: ['./issued-gpass-admin.component.scss']
})
export class IssuedGpassAdminComponent implements OnInit {

 
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
    this.dataservice.getIssuedGpass().subscribe(res =>{
      this.dataSource = res
      console.log(res)
    })

    setInterval(()=>{
      this.refreshData()
    }, 5000)


  }

  reactiveForm(){
      
  }




 refreshData(){
  this.dataservice.getIssuedGpass().subscribe(res =>{
    this.dataSource = res
  })
 }
 
 viewItems(e){
  console.log(e)
  const confirmDialog = this.dialog.open(ViewGpassComponent, {
    data:{
      id: e.id
    }
  });
 }

}
