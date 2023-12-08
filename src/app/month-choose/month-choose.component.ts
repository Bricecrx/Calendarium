import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-month-choose',
  templateUrl: './month-choose.component.html',
  styleUrls: ['./month-choose.component.scss'],
})
export class MonthChooseComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() selectedDate: string | undefined = '';
  @Output() modalHandler = new EventEmitter();

  backgroundColor = '';

  currentMonth = '';
  currentYear = '';

  yearList: string[] = [];
  monthList = [
    'JANVIER',
    'FEVRIER',
    'MARS',
    'AVRIL',
    'MAI',
    'JUIN',
    'JUILLET',
    'AOUT',
    'SEPTEMBRE',
    'OCTOBRE',
    'NOVEMBRE',
    'DECEMBRE',
  ];

  constructor(private colorService: ColorService) {
    for (let i = 2020; i < 2100; i++) {
      this.yearList.push(i.toString());
    }
    // Subscribe to background color for the modal background color
    this.colorService.backgroundColorChanges.subscribe((value) => {
      this.backgroundColor = value;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.selectedDate?.currentValue) {
      this.currentYear = changes.selectedDate.currentValue.split('/')[2];
      const monthNumber: string =
        changes.selectedDate.currentValue.split('/')[1];
      this.currentMonth = this.fromNumberToName(monthNumber);
    }
  }

  handleCancel() {
    const toEmit = {
      year: this.currentYear,
      month: this.fromNameToNumber(this.currentMonth),
    };
    this.modalHandler.emit(toEmit);
  }

  selectMonth(month: string, year: string) {
    const toEmit = { year: year, month: this.fromNameToNumber(month) };
    this.modalHandler.emit(toEmit);
  }

  fromNumberToName(monthNumber: string) {
    if (monthNumber === '01') {
      return this.monthList[0];
    } else if (monthNumber === '02') {
      return this.monthList[1];
    } else if (monthNumber === '03') {
      return this.monthList[2];
    } else if (monthNumber === '04') {
      return this.monthList[3];
    } else if (monthNumber === '05') {
      return this.monthList[4];
    } else if (monthNumber === '06') {
      return this.monthList[5];
    } else if (monthNumber === '07') {
      return this.monthList[6];
    } else if (monthNumber === '08') {
      return this.monthList[7];
    } else if (monthNumber === '09') {
      return this.monthList[8];
    } else if (monthNumber === '10') {
      return this.monthList[9];
    } else if (monthNumber === '11') {
      return this.monthList[10];
    } else {
      return this.monthList[11];
    }
  }

  fromNameToNumber(monthName: string) {
    if (monthName === this.monthList[0]) {
      return '01';
    } else if (monthName === this.monthList[1]) {
      return '02';
    } else if (monthName === this.monthList[2]) {
      return '03';
    } else if (monthName === this.monthList[3]) {
      return '04';
    } else if (monthName === this.monthList[4]) {
      return '05';
    } else if (monthName === this.monthList[5]) {
      return '06';
    } else if (monthName === this.monthList[6]) {
      return '07';
    } else if (monthName === this.monthList[7]) {
      return '08';
    } else if (monthName === this.monthList[8]) {
      return '09';
    } else if (monthName === this.monthList[9]) {
      return '10';
    } else if (monthName === this.monthList[10]) {
      return '11';
    } else {
      return '12';
    }
  }
}
