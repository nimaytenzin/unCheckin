import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedGpassComponent } from './issued-gpass.component';

describe('IssuedGpassComponent', () => {
  let component: IssuedGpassComponent;
  let fixture: ComponentFixture<IssuedGpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuedGpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedGpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
