import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { ViewGpassComponent } from "../../dialogs/view-gpass/view-gpass.component";



@Component({
  selector: 'app-listed-gpass-admin',
  templateUrl: './listed-gpass-admin.component.html',
  styleUrls: ['./listed-gpass-admin.component.scss']
})
export class ListedGpassAdminComponent implements OnInit {

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


}
