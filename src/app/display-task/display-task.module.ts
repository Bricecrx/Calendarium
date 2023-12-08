import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayTaskComponent } from './display-task.component';
import { NzModalModule } from 'ng-zorro-antd/modal';



@NgModule({
  declarations: [DisplayTaskComponent],
  imports: [
    CommonModule,
    NzModalModule
  ],
  exports: [
    DisplayTaskComponent
  ]
})
export class DisplayTaskModule { }
