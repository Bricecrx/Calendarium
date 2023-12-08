import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorModifierComponent } from './color-modifier.component';

describe('ColorModifierComponent', () => {
  let component: ColorModifierComponent;
  let fixture: ComponentFixture<ColorModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorModifierComponent]
    });
    fixture = TestBed.createComponent(ColorModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
