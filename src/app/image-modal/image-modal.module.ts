import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModalComponent } from './image-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FilePickerModule } from '../file-picker/file-picker.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';

import { PlusCircleOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ PlusCircleOutline ];



@NgModule({
  declarations: [ImageModalComponent],
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    FilePickerModule,
    NzIconModule,
    NzIconModule.forRoot(icons),
  ],
  exports: [ImageModalComponent]
})
export class ImageModalModule { }
