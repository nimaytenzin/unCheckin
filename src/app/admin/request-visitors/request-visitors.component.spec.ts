import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestVisitorsComponent } from './request-visitors.component';

describe('RequestVisitorsComponent', () => {
  let component: RequestVisitorsComponent;
  let fixture: ComponentFixture<RequestVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
