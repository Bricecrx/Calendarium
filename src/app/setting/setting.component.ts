import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  @Input() isVisible = false;
  @Output() modalHandler = new EventEmitter();
  isVisibleBirthdayModal = false;
  isVisibleEventModal = false;
  isVisibleColorModal = false;

  backgroundColor = '';

  constructor(private colorService: ColorService) {
    // Subscribe to background color for the modal background color
    this.colorService.backgroundColorChanges.subscribe((value) => {
      this.backgroundColor = value;
    });
  }

  handleCancel() {
    this.modalHandler.emit();
  }

  handleBirthdayModal() {
    this.isVisibleBirthdayModal = !this.isVisibleBirthdayModal;
    this.modalHandler.emit();
  }

  handleEventModal() {
    this.isVisibleEventModal = !this.isVisibleEventModal;
    this.modalHandler.emit();
  }

  handleColorModal() {
    this.isVisibleColorModal = !this.isVisibleColorModal;
    this.modalHandler.emit();
  }
}
