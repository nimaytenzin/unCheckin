import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-view-gpass',
  templateUrl: './view-gpass.component.html',
  styleUrls: ['./view-gpass.component.scss']
})
export class ViewGpassComponent implements OnInit {

  displayedColumns: string[] = ['index', 'particulars', 'quantity','returnable'];

  dataSource;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<ViewGpassComponent>,
    public dialog: MatDialog,
    private dataservice:DataService
  ) { }

  ngOnInit() {
    console.log(this.data.id, 'id of the gpass')
    this.dataservice.getGateItems(this.data.id).subscribe(res =>{
      this.dataSource = res
    })


  }

}
