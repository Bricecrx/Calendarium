import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBirthdayComponent } from './add-birthday.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';



@NgModule({
  declarations: [
    AddBirthdayComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzCheckboxModule,
    ReactiveFormsModule,
  ],
  exports: [ AddBirthdayComponent]
})
export class AddBirthdayModule { }
