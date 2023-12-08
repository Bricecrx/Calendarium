import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthChooseComponent } from './month-choose.component';
import { NzModalModule } from 'ng-zorro-antd/modal';



@NgModule({
  declarations: [MonthChooseComponent],
  imports: [
    CommonModule,
    NzModalModule
  ],
  exports: [
    MonthChooseComponent
  ]
})
export class MonthChooseModule { }
