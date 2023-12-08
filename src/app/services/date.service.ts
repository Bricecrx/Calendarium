import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private date = '';
  dateChanges: Subject<string> = new Subject<string>();

  constructor() {
    // Construct today's date well
    const today = new Date();
    let rightMonth = '';
    let rightDay = '';
    // Deal with weird month thing
    if (today.getMonth() + 1 > 9) {
      rightMonth = (today.getMonth() + 1).toString();
    } else {
      rightMonth = '0' + (today.getMonth() + 1).toString();
    }
    // Deal with 0 before day
    if (today.getDate() > 9) {
      rightDay = today.getDate().toString();
    } else {
      rightDay = '0' + today.getDate().toString();
    }
    this.date =
      rightDay +
      '/' +
      rightMonth +
      '/' +
      today.getFullYear().toString();
    // TODO : Remove this cheat code
    // this.date = '26/08/2023';
  }

  getSelectedDate() {
    return this.date;
  }

  setSelectedDate(date: string) {
    this.date = date;
    this.dateChanges.next(this.date);
  }
}
