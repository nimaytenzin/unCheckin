import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  visitorsRequestForm: FormGroup;
  visitorTypes=[
    {name:"Vehicle"},
    {name:"Person"}
  ]
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  reactiveForms(){
    this.visitorsRequestForm = this.fb.group({
      VisitorType:[],
      Identification:[],
      visitDate:[]
    })
  }


  submit(){

  }

}
