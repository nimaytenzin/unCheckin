import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTableComponent } from './agency-table.component';

describe('AgencyTableComponent', () => {
  let component: AgencyTableComponent;
  let fixture: ComponentFixture<AgencyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
