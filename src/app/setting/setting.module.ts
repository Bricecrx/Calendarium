import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBirthdayModule } from '../add-birthday/add-birthday.module';
import { AddEventModule } from '../add-event/add-event.module';
import { ColorModifierModule } from '../color-modifier/color-modifier.module';



@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    AddBirthdayModule,
    AddEventModule,
    ColorModifierModule,
    ReactiveFormsModule,
  ],
  exports: [SettingComponent]
})
export class SettingModule { }
