import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLogTableComponent } from './vehicle-log-table.component';

describe('VehicleLogTableComponent', () => {
  let component: VehicleLogTableComponent;
  let fixture: ComponentFixture<VehicleLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
