/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import moment, { MomentInput } from 'moment';
import range from 'lodash.range';
import { DateService } from '../services/date.service';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() birthdays: any[] = [];
  @Input() events: any[] = [];
  monthBirthdays: any[] = [];
  monthEvents: any[] = [];

  public currentDate: moment.Moment = moment();
  public namesOfDays = ['D', 'L', 'M', 'Me', 'J', 'V', 'S'];
  public weeks: Array<CalendarDate[]> = [];

  public selectedDate: string | undefined;
  isVisibleModal = false;

  @ViewChild('calendar', { static: true }) calendar: any;

  ngOnInit() {
    this.currentDate = moment();
    this.selectedDate = moment(this.currentDate).format('DD/MM/YYYY');
    this.generateCalendar();
    // Init month birthday and event lists
    this.updateMonthBirthdayList();
    this.updateMonthEventList();
  }

  ngOnChanges() {
    this.updateMonthBirthdayList();
    this.updateMonthEventList();
  }

  constructor(private dateService: DateService) {}

  private generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  private fillDates(currentMoment: moment.Moment) {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const lastOfMonth = moment(currentMoment).endOf('month').day();

    const firstDayOfGrid = moment(currentMoment)
      .startOf('month')
      .subtract(firstOfMonth, 'days');
    const lastDayOfGrid = moment(currentMoment)
      .endOf('month')
      .subtract(lastOfMonth, 'days')
      .add(7, 'days');
    const startCalendar = firstDayOfGrid.date();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return range(
      startCalendar,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days')
    ).map((date: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newDate = moment(firstDayOfGrid).date(date);
      return {
        today: this.isToday(newDate),
        selected: this.isSelected(newDate),
        mDate: newDate,
      };
    });
  }

  private isToday(date: moment.Moment): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return moment().isSame(moment(date), 'day');
  }

  public prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.updateMonthBirthdayList();
    this.updateMonthEventList();
    this.generateCalendar();
  }

  public nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.updateMonthBirthdayList();
    this.updateMonthEventList();
    this.generateCalendar();
  }

  public isDisabledMonth(currentDate: moment.MomentInput): boolean {
    const today = moment();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return moment(currentDate).isBefore(today, 'months');
  }

  public isSelectedMonth(date: moment.Moment): boolean {
    const today = moment();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return moment(date).isSame(this.currentDate, 'month');
  }

  public selectDate(date: CalendarDate) {
    this.selectedDate = moment(date.mDate).format('DD/MM/YYYY');
    this.generateCalendar();
    this.dateService.setSelectedDate(this.selectedDate);
  }

  // // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  // private isSelected(date: moment.Moment): boolean {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //   return (
  //     (moment(date).isBefore(this.selectedEndWeek) &&
  //       moment(date).isAfter(this.selectedStartWeek)) ||
  //     moment(date.format('YYYY-MM-DD')).isSame(
  //       this.selectedStartWeek?.format('YYYY-MM-DD')
  //     ) ||
  //     moment(date.format('YYYY-MM-DD')).isSame(
  //       this.selectedEndWeek?.format('YYYY-MM-DD')
  //     )
  //   );
  // }
  private isSelected(date: moment.Moment): boolean {
    return this.selectedDate === moment(date).format('DD/MM/YYYY');
  }

  public isDayBeforeLastSat(date: moment.Moment): boolean {
    const lastSat = moment().weekday(-1);
    return moment(date).isSameOrBefore(lastSat);
  }

  showModal() {
    this.isVisibleModal = !this.isVisibleModal;
  }

  handleModal(event: any) {
    this.isVisibleModal = !this.isVisibleModal;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.currentDate = moment(event.month + event.year, 'MMYYYY');
    this.updateMonthBirthdayList();
    this.updateMonthEventList();
    this.generateCalendar();
  }

  translateMonth(month: string) {
    if (month === 'JANUARY') {
      return 'JANVIER';
    } else if (month === 'FEBRUARY') {
      return 'FEVRIER';
    } else if (month === 'MARCH') {
      return 'MARS';
    } else if (month === 'APRIL') {
      return 'AVRIL';
    } else if (month === 'MAY') {
      return 'MAI';
    } else if (month === 'JUNE') {
      return 'JUIN';
    } else if (month === 'JULY') {
      return 'JUILLET';
    } else if (month === 'AUGUST') {
      return 'AOUT';
    } else if (month === 'SEPTEMBER') {
      return 'SEPTEMBRE';
    } else if (month === 'OCTOBER') {
      return 'OCTOBRE';
    } else if (month === 'NOVEMBER') {
      return 'NOVEMBRE';
    } else if (month === 'DECEMBER') {
      return 'DECEMBRE';
    }
  }

  updateMonthBirthdayList() {
    this.monthBirthdays = this.birthdays.filter((birthday) => {
      const month = moment(this.currentDate).format('DD/MM/YYYY').split('/')[1];
      const year = moment(this.currentDate).format('DD/MM/YYYY').split('/')[2];
      if (
        birthday.data.date.split('/')[1] === month &&
        birthday.data.date.split('/')[2] === year
      ) {
        return true;
      }
      return false;
    });
  }

  updateMonthEventList() {
    this.monthEvents = this.events.filter((event) => {
      const month = moment(this.currentDate).format('DD/MM/YYYY').split('/')[1];
      const year = moment(this.currentDate).format('DD/MM/YYYY').split('/')[2];
      if (
        event.data.date.split('/')[1] === month &&
        event.data.date.split('/')[2] === year
      ) {
        return true;
      }
      return false;
    });
  }

  // Check if the day given matches with an element of the list
  isDayInList(day: any, list: any) {
    for (const element of list) {
      if (Number(element.data.date.split('/')[0]) === day) {
        return true;
      }
    }
    return false;
  }

  // Same but give a list of boolean to differentiate exam and common events
  isDayInListEvent(day: any, list: any) {
    const answerList = [false, false];
    let elementIndex = 0;
    while (
      elementIndex < list.length &&
      (answerList[0] === false || answerList[1] === false)
    ) {
      if (
        Number(list[elementIndex].data.date.split('/')[0]) === day &&
        list[elementIndex].data.isCC === false
      ) {
        answerList[0] = true;
        console.log('there is an event today');
      }
      if (
        Number(list[elementIndex].data.date.split('/')[0]) === day &&
        list[elementIndex].data.isCC === true
      ) {
        answerList[1] = true;
        console.log('there is an exam today');
      }
      elementIndex++;
    }
    return answerList;
  }
}
