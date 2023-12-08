import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePickerDirective } from './file-picker.directive';



@NgModule({
  declarations: [FilePickerDirective],
  imports: [
    CommonModule
  ],
  exports: [FilePickerDirective]
})
export class FilePickerModule { }
