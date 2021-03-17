import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyDialogComponent } from './agency-dialog.component';

describe('AgencyDialogComponent', () => {
  let component: AgencyDialogComponent;
  let fixture: ComponentFixture<AgencyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
