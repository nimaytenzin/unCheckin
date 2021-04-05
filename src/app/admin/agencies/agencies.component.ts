import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AgencyDialogComponent } from 'src/app/dialogs/agency-dialog/agency-dialog.component';
import { DataService } from 'src/app/service/data.service';
import {ConfirmDialogComponent  } from "../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.scss']
})
export class AgenciesComponent implements OnInit {
  displayedColumns: string[] = ['index', 'agencyName','action'];
  dataSource;

  constructor(
    private dataservice:DataService,
    private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.dataservice.getAllAgency().subscribe(res => {
      this.dataSource = res.data  
    })
  }

  editAgency(e){
    const confirmDialog = this.dialog.open(AgencyDialogComponent, {
      data:{
        title: "Edit Agency",
        name:e.name,
        edit:true,
        id:e.id,
        role:e.role,
        agency_id:e.agency_id
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result !== null){
        this.dataservice.updateAgncy(e.id,result[0]).subscribe(res => {
          this.snackbar.open(`Updated `, '',{
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

  deleteAgency(e){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "Delete?",
        message:`Delete Agency ${e.name}?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
       this.dataservice.deleteAgency(e.id).subscribe(res =>{
        this.snackbar.open(`Deleted ${e.name}`, '',{
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

  refreshData(){
    this.dataservice.getAllAgency().subscribe(res => {
      this.dataSource = res.data  
    })
  }

  addAgency(){
    const confirmDialog = this.dialog.open(AgencyDialogComponent, {
      data:{
        title: "Add New Agency"
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if(result !== null){
        this.dataservice.postAgency(result[0]).subscribe(res => {
          this.snackbar.open(`Checked Out `, '',{
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
