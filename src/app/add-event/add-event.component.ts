import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from '../services/event.service';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent {
  formData: FormGroup;
  showError = false;
  @Input() isVisible = false;
  @Output() modalHandler = new EventEmitter();
  backgroundColor = '';

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private colorService: ColorService
  ) {
    this.formData = this.formBuilder.group({
      name: [null],
      checkbox: [false],
      date: [null],
    });
    // Subscribe to background color for the modal background color
    this.colorService.backgroundColorChanges.subscribe((value) => {
      this.backgroundColor = value;
    });
  }

  handleCancel() {
    this.formData.reset();
    this.modalHandler.emit();
  }

  async submit() {
    try {
      if (this.formData.invalid) {
        return;
      }
      //We do a test with hour format
      if (!this.testDateFormat()) {
        this.showError = true;
        return;
      }
      const event = {
        name: this.formData.value.name,
        date: this.formData.value.date,
        isCC: this.formData.value.checkbox
      };
      await this.eventService.addEvent(event);
      this.formData.reset();
      this.modalHandler.emit();
    } catch (e) {
      console.log('e', e);
    }
  }

  testDateFormat(): boolean {
    const dateTest = this.formData.value.date.split('/');
    if (dateTest.length !== 3) {
      return false;
    }
    if (
      dateTest[0].length !== 2 ||
      dateTest[1].length !== 2 ||
      dateTest[2].length !== 4
    ) {
      return false;
    }
    const day = dateTest[0];
    const month = dateTest[1];
    const year = dateTest[2];
    if (
      !this.testCharacterNumber(day[0]) ||
      !this.testCharacterNumber(day[1])
    ) {
      return false;
    }
    if (
      !this.testCharacterNumber(month[0]) ||
      !this.testCharacterNumber(month[1])
    ) {
      return false;
    }
    if (
      !this.testCharacterNumber(year[0]) ||
      !this.testCharacterNumber(year[1]) ||
      !this.testCharacterNumber(year[2]) ||
      !this.testCharacterNumber(year[3])
    ) {
      return false;
    }
    return true;
  }

  testCharacterNumber(character: any): boolean {
    if (
      character === '0' ||
      character === '1' ||
      character === '2' ||
      character === '3' ||
      character === '4' ||
      character === '5' ||
      character === '6' ||
      character === '7' ||
      character === '8' ||
      character === '9'
    ) {
      return true;
    } else {
      return false;
    }
  }
}
