import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedGpassAdminComponent } from './issued-gpass-admin.component';

describe('IssuedGpassAdminComponent', () => {
  let component: IssuedGpassAdminComponent;
  let fixture: ComponentFixture<IssuedGpassAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuedGpassAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedGpassAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
