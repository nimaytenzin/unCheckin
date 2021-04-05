import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedGpassAdminComponent } from './listed-gpass-admin.component';

describe('ListedGpassAdminComponent', () => {
  let component: ListedGpassAdminComponent;
  let fixture: ComponentFixture<ListedGpassAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListedGpassAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedGpassAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
