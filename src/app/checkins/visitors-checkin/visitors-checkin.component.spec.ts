import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsCheckinComponent } from './visitors-checkin.component';

describe('VisitorsCheckinComponent', () => {
  let component: VisitorsCheckinComponent;
  let fixture: ComponentFixture<VisitorsCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
