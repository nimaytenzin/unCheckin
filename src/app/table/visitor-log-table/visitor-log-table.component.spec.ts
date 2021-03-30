import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorLogTableComponent } from './visitor-log-table.component';

describe('VisitorLogTableComponent', () => {
  let component: VisitorLogTableComponent;
  let fixture: ComponentFixture<VisitorLogTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorLogTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
