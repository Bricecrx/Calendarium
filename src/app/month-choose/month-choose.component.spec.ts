import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthChooseComponent } from './month-choose.component';

describe('MonthChooseComponent', () => {
  let component: MonthChooseComponent;
  let fixture: ComponentFixture<MonthChooseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthChooseComponent]
    });
    fixture = TestBed.createComponent(MonthChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
