import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTaskComponent } from './add-or-edit-task.component';

describe('AddOrEditTaskComponent', () => {
  let component: AddOrEditTaskComponent;
  let fixture: ComponentFixture<AddOrEditTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditTaskComponent]
    });
    fixture = TestBed.createComponent(AddOrEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
