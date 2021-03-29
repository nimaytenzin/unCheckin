import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGatepassComponent } from './admin-gatepass.component';

describe('AdminGatepassComponent', () => {
  let component: AdminGatepassComponent;
  let fixture: ComponentFixture<AdminGatepassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGatepassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
