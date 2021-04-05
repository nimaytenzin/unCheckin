import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-review-gpass',
  templateUrl: './review-gpass.component.html',
  styleUrls: ['./review-gpass.component.scss']
})
export class ReviewGpassComponent implements OnInit {

  
  displayedColumns: string[] = ['index', 'particulars', 'quantity','returnable','status','action'];

  dataSource;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<ReviewGpassComponent>,
    public dialog: MatDialog,
    private snackbar:MatSnackBar,
    private dataservice:DataService
  ) { }

  ngOnInit() {
    this.dataservice.getGateItems(this.data.id).subscribe(res =>{
      this.dataSource = res
      console.log(res,'gitems')
    })


  }

  refreshData(){
    this.dataservice.getGateItems(this.data.id).subscribe(res =>{
      this.dataSource = res
    })
  }

  markAsReturned(e){
    console.log(e)

    let gitem = {
      id:e.id,
      status :"returned"
    }

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {  
      data:{
        title: "Verify?",
        message:`Mark item as Returned?`
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if(result === true){
        this.dataservice.markGateItemAsComplete(e.id, gitem).subscribe(res => {
          this.snackbar.open(`Item Marked as returned`, '',{
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


  markAsNotReturned(){
    console.log('Marked as Not returned')
  }



  verifyDisabled(e){
    if(e.returnable === 0 || e.status === "returned"){
      return true
    }else{
      return false
    }
  }

}
