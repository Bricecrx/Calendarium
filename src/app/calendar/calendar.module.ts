import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { MonthChooseModule } from '../month-choose/month-choose.module';
import { NzBadgeModule } from 'ng-zorro-antd/badge';



@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    MonthChooseModule,
    NzBadgeModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
