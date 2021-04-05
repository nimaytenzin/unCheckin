import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-gate-pass',
  templateUrl: './gate-pass.component.html',
  styleUrls: ['./gate-pass.component.scss']
})
export class GatePassComponent implements OnInit {

  constructor(
    private dataservice:DataService
  ) { }

  ngOnInit() {
  }

}
