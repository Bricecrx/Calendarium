import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageShowerComponent } from './image-shower.component';
import { ImageModalModule } from '../image-modal/image-modal.module';



@NgModule({
  declarations: [ImageShowerComponent],
  imports: [
    CommonModule,
    ImageModalModule
  ],
  exports: [ImageShowerComponent]
})
export class ImageShowerModule { }
