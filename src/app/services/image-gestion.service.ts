import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class ImageGestionService {
  private imageList: any[] = [];
  imageListChanges: Subject<any[]> = new Subject<any[]>();

  constructor(private imageService: ImageService) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.imageService.getImages().then((data) => {
      this.imageList = data;
    })
  }

  async getImageListOnLaunch() {
    this.imageList = await this.imageService.getImages();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.imageList;
  }

  getImageList() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.imageList;
  }

  async addImage(image: any) {
    // this.imageList.push(image);
    await this.imageService.addImage(image);
    await this.updateLocalImageList();
  }

  async updateImage(image: any) {
    // const index = this.imageList.findIndex((element) => element.id === image.id);
    // this.imageList[index] = image;
    await this.imageService.updateImage(image);
    await this.updateLocalImageList();
  }

  async deleteImage(image: any) {
    // const index = this.imageList.findIndex((element) => element.id === image.id);
    // this.imageList.splice(index, 1);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.imageService.deleteImage(image.id);
    await this.updateLocalImageList();
  }

  async updateLocalImageList() {
    this.imageList = await this.imageService.getImages();
    this.imageListChanges.next(this.imageList);
  }
}
