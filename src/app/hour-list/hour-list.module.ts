import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourListComponent } from './hour-list.component';
import { DisplayTaskModule } from '../display-task/display-task.module';



@NgModule({
  declarations: [
    HourListComponent
  ],
  imports: [
    CommonModule,
    DisplayTaskModule,
  ],
  exports: [
    HourListComponent
  ]
})
export class HourListModule { }
