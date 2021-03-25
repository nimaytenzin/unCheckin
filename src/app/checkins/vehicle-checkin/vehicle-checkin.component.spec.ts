import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCheckinComponent } from './vehicle-checkin.component';

describe('VehicleCheckinComponent', () => {
  let component: VehicleCheckinComponent;
  let fixture: ComponentFixture<VehicleCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
