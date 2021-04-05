import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedGpassComponent } from './listed-gpass.component';

describe('ListedGpassComponent', () => {
  let component: ListedGpassComponent;
  let fixture: ComponentFixture<ListedGpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListedGpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListedGpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
