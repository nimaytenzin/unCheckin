import { Component,  Input,  OnInit,  ViewChild , OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { AgencyDialogComponent } from "../agency-dialog/agency-dialog.component";
export interface UsersData {
  id:number;
  idNumber: string;
  age: number;
  gender:string;
  incomeEarner:string;
  type:string;
}

const ELEMENT_DATA: UsersData[] = [
];


@Component({
  selector: 'app-agency-table',
  templateUrl: './agency-table.component.html',
  styleUrls: ['./agency-table.component.scss']
})
export class AgencyTableComponent implements OnInit {
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  i=1;

  displayedColumns: string[] = ['id','cid', 'age', 'gender', 'IncomeEarner','action'];
  dataSource = ELEMENT_DATA;
  @Input() members:UsersData[];
  constructor(
    private dataservice:DataService
  ) { }

  ngOnInit() {
    this.dataservice.familyMember = null
    this.dataSource = [];
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['members']){
      this.dataSource = this.members
    }
  }

  // openDialog(action,obj) {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(AgencyDialogComponent, {
  //     width: '250px',
  //     data:obj
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result.event == 'Add'){
  //       this.addRowData(result.data);
  //     }else if(result.event == 'Update'){
  //       this.updateRowData(result.data);
  //     }else if(result.event == 'Delete'){
  //       this.deleteRowData(result.data);
  //     }
  //   });
  // }

  addRowData(row_obj){
    this.dataSource.push({
      id: this.i++,
      idNumber:row_obj.idNumber,
      age:row_obj.age,
      gender:row_obj.gender,
      incomeEarner:row_obj.incomeEarner,
      type:row_obj.type
    });
    this.table.renderRows();
    this.dataservice.familyMember = this.dataSource

  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id === row_obj.id){
        value.idNumber= row_obj.idNumber;
        value.age = row_obj.age;
        value.gender = row_obj.gender;
      }
      return true;
    });
    this.dataservice.familyMember = this.dataSource

  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.idNumber!= row_obj.idNumber;
    });
    this.dataservice.familyMember = this.dataSource

  }

  logData(){
    console.log(this.dataSource)
  }

}
