import { Component,  Input,  OnInit,  ViewChild , OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { GatepassDialogComponent } from "../gatepass-dialog/gatepass-dialog.component";
export interface Items {
  gid:number;
  name: string;
  quantity: number;
  returnable:string;
  status:string
}

const ELEMENT_DATA: Items[] = [
];

@Component({
  selector: 'app-gatepass-table',
  templateUrl: './gatepass-table.component.html',
  styleUrls: ['./gatepass-table.component.scss']
})
export class GatepassTableComponent implements OnInit {

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  i=1;

  displayedColumns: string[] = ['id','itemName', 'quantity', 'returnable','action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, private dataservice:DataService) {}

  @Input() members:Items[];

  ngOnInit(){
    this.dataservice.gatePassItems = null
    this.dataSource = [];
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['members']){
      this.dataSource = this.members
    }
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(GatepassDialogComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    this.dataSource.push({
      gid: this.i++,
      name:row_obj.name,
      quantity:row_obj.quantity,
      returnable:row_obj.returnable,
      status:"issued",
    });
    this.table.renderRows();
    this.dataservice.gatePassItems = this.dataSource

  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.gid === row_obj.id){
        value.name= row_obj.name;
        value.quantity = row_obj.quantity;
        value.returnable = row_obj.returnable;
      }
      return true;
    });
    this.dataservice.gatePassItems = this.dataSource

  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.name!= row_obj.name;
    });
    this.dataservice.gatePassItems = this.dataSource

  }

  logData(){
    console.log(this.dataSource)
  }
}
