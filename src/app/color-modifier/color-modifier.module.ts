import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorModifierComponent } from './color-modifier.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';



@NgModule({
  declarations: [
    ColorModifierComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzToolTipModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  exports: [ColorModifierComponent]
})
export class ColorModifierModule { }
