import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageGestionService } from '../services/image-gestion.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {
  @Input() isVisible = false;
  @Output() modalHandler = new EventEmitter();
  imageList: any = null;

  constructor(private imageGestionService: ImageGestionService) {}

  async ngOnInit() {
    this.imageList = await this.imageGestionService.getImageListOnLaunch();
    this.imageGestionService.imageListChanges.subscribe(() => {
      this.imageList = this.imageGestionService.getImageList();
    });
  }

  handleCancel() {
    this.modalHandler.emit();
  }

  async deleteImage(image: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.imageGestionService.deleteImage(image);
  }

  importImages(event: any) {
    console.log('You have to find a way bro');
    console.log(event);
  }

  fromAddressToName(address: string): string {
    const addressSplitted = address.split('/');
    return addressSplitted[2];
  }
}
