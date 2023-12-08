import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AddOrEditTaskModule } from '../add-or-edit-task/add-or-edit-task.module';
import { DisplayTaskModule } from '../display-task/display-task.module';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [TaskListComponent],
  imports: [
    CommonModule,
    NzCheckboxModule,
    AddOrEditTaskModule,
    DisplayTaskModule,
    NzIconModule
  ],
  exports: [TaskListComponent]
})
export class TaskListModule { }
