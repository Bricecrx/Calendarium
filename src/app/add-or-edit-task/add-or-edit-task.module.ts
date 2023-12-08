import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddOrEditTaskComponent } from './add-or-edit-task.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [AddOrEditTaskComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
  ],
  exports: [AddOrEditTaskComponent],
})
export class AddOrEditTaskModule {}
