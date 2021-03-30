import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLogTableComponent } from './employee-log-table.component';

describe('EmployeeLogTableComponent', () => {
  let component: EmployeeLogTableComponent;
  let fixture: ComponentFixture<EmployeeLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
