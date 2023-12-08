import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-color-modifier',
  templateUrl: './color-modifier.component.html',
  styleUrls: ['./color-modifier.component.scss'],
})
export class ColorModifierComponent implements OnInit {
  formData: FormGroup;
  @Input() isVisible = false;
  @Output() modalHandler = new EventEmitter();

  backgroundColor = '';
  buttonFormColor = '';
  calendarColor = '';
  taskHighlightColor = '';
  monthSelectedButtonColor = '';
  monthNonSelectedButtonColor = '';

  colors: any[] = [];
  modalBackgroundColor = '';

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService
  ) {
    this.formData = this.formBuilder.group({
      background: [null],
      calendar: [null],
      buttonForm: [null],
      highlight: [null],
      monthSelected: [null],
      monthNonSelected: [null],
    });
    // Subscribe to background color for the modal background color
    this.colorService.backgroundColorChanges.subscribe((value) => {
      this.modalBackgroundColor = value;
    });
  }

  async ngOnInit() {
    this.colors = await this.colorService.getColors();
    this.backgroundColor = this.colors.filter(
      (el) => el.id === 'background-color'
    )[0].data.color;
    this.buttonFormColor = this.colors.filter(
      (el) => el.id === 'button-form-background-color'
    )[0].data.color;
    this.calendarColor = this.colors.filter(
      (el) => el.id === 'calendar-background-color'
    )[0].data.color;
    this.taskHighlightColor = this.colors.filter(
      (el) => el.id === 'task-highlight-color'
    )[0].data.color;
    this.monthSelectedButtonColor = this.colors.filter(
      (el) => el.id === 'selected-month-choose-button-color'
    )[0].data.color;
    this.monthNonSelectedButtonColor = this.colors.filter(
      (el) => el.id === 'month-choose-button-color'
    )[0].data.color;
  }

  handleCancel() {
    this.formData.reset();
    this.modalHandler.emit();
  }

  async submit() {
    try {
      // Reset form data and close modal
      this.formData.reset();
      this.modalHandler.emit();
      // Give the color values
      document.documentElement.style.setProperty(
        '--background',
        this.backgroundColor
      );
      document.documentElement.style.setProperty(
        '--button-form-background',
        this.buttonFormColor
      );
      document.documentElement.style.setProperty(
        '--calendar-background',
        this.calendarColor
      );
      document.documentElement.style.setProperty(
        '--task-highlight',
        this.taskHighlightColor
      );
      document.documentElement.style.setProperty(
        '--selected-month-choose-button',
        this.monthSelectedButtonColor
      );
      document.documentElement.style.setProperty(
        '--month-choose-button',
        this.monthNonSelectedButtonColor
      );
      // Modify the colors from color service
      await this.colorService.updateColor({
        id: 'background-color',
        data: { color: this.backgroundColor },
      });
      await this.colorService.updateColor({
        id: 'button-form-background-color',
        data: { color: this.buttonFormColor },
      });
      await this.colorService.updateColor({
        id: 'calendar-background-color',
        data: { color: this.calendarColor },
      });
      await this.colorService.updateColor({
        id: 'task-highlight-color',
        data: { color: this.taskHighlightColor },
      });
      await this.colorService.updateColor({
        id: 'selected-month-choose-button-color',
        data: { color: this.monthSelectedButtonColor },
      });
      await this.colorService.updateColor({
        id: 'month-choose-button-color',
        data: { color: this.monthNonSelectedButtonColor },
      });
    } catch (e) {
      console.log('e', e);
    }
  }

  async reinitialize() {
    try {
      // Reset form data and close modal
      this.formData.reset();
      this.modalHandler.emit();
      // Give the color values
      document.documentElement.style.setProperty('--background', '#F4EEE7');
      document.documentElement.style.setProperty(
        '--button-form-background',
        '#d291bc'
      );
      document.documentElement.style.setProperty(
        '--calendar-background',
        '#D4C7C2'
      );
      document.documentElement.style.setProperty('--task-highlight', '#CCE4DA');
      document.documentElement.style.setProperty(
        '--selected-month-choose-button',
        '#D291BC'
      );
      document.documentElement.style.setProperty(
        '--month-choose-button',
        '#F3E1E5'
      );
      // Modify the colors from color service
      await this.colorService.updateColor({
        id: 'background-color',
        data: { color: '#F4EEE7' },
      });
      await this.colorService.updateColor({
        id: 'button-form-background-color',
        data: { color: '#d291bc' },
      });
      await this.colorService.updateColor({
        id: 'calendar-background-color',
        data: { color: '#D4C7C2' },
      });
      await this.colorService.updateColor({
        id: 'task-highlight-color',
        data: { color: '#CCE4DA' },
      });
      await this.colorService.updateColor({
        id: 'selected-month-choose-button-color',
        data: { color: '#D291BC' },
      });
      await this.colorService.updateColor({
        id: 'month-choose-button-color',
        data: { color: '#F3E1E5' },
      });
      // Modify the color picker values
      this.backgroundColor = '#F4EEE7';
      this.buttonFormColor = '#d291bc';
      this.calendarColor = '#D4C7C2';
      this.taskHighlightColor = '#CCE4DA';
      this.monthSelectedButtonColor = '#D291BC';
      this.monthNonSelectedButtonColor = '#F3E1E5';
    } catch (e) {
      console.log('e', e);
    }
  }
}
