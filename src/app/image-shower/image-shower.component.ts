import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ImageGestionService } from '../services/image-gestion.service';

@Component({
  selector: 'app-image-shower',
  templateUrl: './image-shower.component.html',
  styleUrls: ['./image-shower.component.scss'],
})
export class ImageShowerComponent implements OnInit {
  addressList: any[] = [];
  currentAddress = '';
  sub: Subscription = new Subscription();
  isVisibleModal = false;

  constructor(private imageGestionService: ImageGestionService) {}

  async ngOnInit() {
    // Initializes list for first time
    this.addressList = await this.imageGestionService.getImageListOnLaunch();
    if (this.addressList.length !== 0) {
      this.currentAddress =
        this.addressList[
          this.getRandomInt(this.addressList.length)
        ].data.address;
    }
    // Subscribe
    this.imageGestionService.imageListChanges.subscribe(() => {
      this.addressList = this.imageGestionService.getImageList();
      if (this.addressList.length !== 0) {
        this.currentAddress = this.addressList[0].data.address;
      }
    });
    this.sub = interval(20000).subscribe(() => {
      this.currentAddress =
        this.addressList[
          this.getRandomInt(this.addressList.length)
        ].data.address;
    });
  }

  openModal() {
    this.isVisibleModal = true;
  }

  handleModal() {
    this.isVisibleModal = !this.isVisibleModal;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
