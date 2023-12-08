import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from '../services/date.service';
import { BirthdayService } from '../services/birthday.service';
import { EventService } from '../services/event.service';
import { ColorService } from '../services/color.service';

export interface TaskList {
  id: number;
  data: {
    title: string;
    description: string;
    date: string;
    hour: string;
    done: boolean;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isVisibleAddEditModal = false;
  isVisibleSettingModal = false;

  constructor(
    private router: Router,
    private dateService: DateService,
    private birthdayService: BirthdayService,
    private eventService: EventService,
    private colorService: ColorService
  ) {}

  selectedDate = '';
  selectedDateInLetter = '';

  birthdays: any[] = [];
  filteredBirthdays: any[] = [];
  events: any[] = [];
  filteredEvents: any[] = [];
  colors: any[] = [];

  async ngOnInit() {
    // Initialize colors of the app
    this.colors = await this.colorService.getColors();
    document.documentElement.style.setProperty(
      '--background',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.colors.filter((el) => el.id === 'background-color')[0].data.color
    );
    document.documentElement.style.setProperty(
      '--button-form-background',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.colors.filter((el) => el.id === 'button-form-background-color')[0]
        .data.color
    );
    document.documentElement.style.setProperty(
      '--calendar-background',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.colors.filter((el) => el.id === 'calendar-background-color')[0].data
        .color
    );
    document.documentElement.style.setProperty(
      '--task-highlight',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.colors.filter((el) => el.id === 'task-highlight-color')[0].data.color
    );
    document.documentElement.style.setProperty(
      '--selected-month-choose-button',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.colors.filter(
        (el) => el.id === 'selected-month-choose-button-color'
      )[0].data.color
    );
    document.documentElement.style.setProperty(
      '--month-choose-button',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.colors.filter((el) => el.id === 'month-choose-button-color')[0].data
        .color
    );
    // Initialize date
    this.selectedDate = this.dateService.getSelectedDate();
    // Initialize birthdays and filtered birthdays
    this.birthdays = await this.birthdayService.getBirthdays();
    this.filteredBirthdays = this.birthdays.filter((element) => {
      return element.data.date === this.selectedDate;
    });
    // Initialize events and filtered events
    this.events = await this.eventService.getEvents();
    this.filteredEvents = this.events.filter((element) => {
      return element.data.date === this.selectedDate;
    });
    this.updateSelectedDateInLetter();
    // Subscribe to date changes and adapt
    this.dateService.dateChanges.subscribe(() => {
      // date
      this.selectedDate = this.dateService.getSelectedDate();
      this.updateSelectedDateInLetter();
      // birthdays
      this.filteredBirthdays = this.birthdays.filter((element) => {
        return element.data.date === this.selectedDate;
      });
      this.filteredEvents = this.events.filter((element) => {
        return element.data.date === this.selectedDate;
      });
    });
    // Subscribe to birthdays changes and adapt
    this.birthdayService.birthdayChanges.subscribe((value) => {
      this.birthdays = value;
      this.filteredBirthdays = this.birthdays.filter((element) => {
        return element.data.date === this.selectedDate;
      });
    });
    // Subscribe to event changes and adapt
    this.eventService.eventChanges.subscribe((value) => {
      this.events = value;
      this.filteredEvents = this.events.filter((element) => {
        return element.data.date === this.selectedDate;
      });
    });
  }

  handleAddEditModal() {
    this.isVisibleAddEditModal = !this.isVisibleAddEditModal;
  }

  handleSettingModal() {
    this.isVisibleSettingModal = !this.isVisibleSettingModal;
  }

  updateSelectedDateInLetter() {
    const splittedDate = this.selectedDate.split('/');
    // Remove the 0 at beginning of day number if needed
    if (splittedDate[0][0] === '0') {
      splittedDate[0] = splittedDate[0].slice(1);
    }
    // Find the month
    let month = 'Janvier';
    if (splittedDate[1] == '01') {
      month = 'Janvier';
    } else if (splittedDate[1] == '02') {
      month = 'Février';
    } else if (splittedDate[1] == '03') {
      month = 'Mars';
    } else if (splittedDate[1] == '04') {
      month = 'Avril';
    } else if (splittedDate[1] == '05') {
      month = 'Mai';
    } else if (splittedDate[1] == '06') {
      month = 'Juin';
    } else if (splittedDate[1] == '07') {
      month = 'Juillet';
    } else if (splittedDate[1] == '08') {
      month = 'Août';
    } else if (splittedDate[1] == '09') {
      month = 'Septembre';
    } else if (splittedDate[1] == '10') {
      month = 'Octobre';
    } else if (splittedDate[1] == '11') {
      month = 'Novembre';
    } else {
      month = 'Décembre';
    }
    // Actually changes date in letter
    this.selectedDateInLetter =
      splittedDate[0] + ' ' + month + ' ' + splittedDate[2];
  }

  async deleteBirthday(birthday: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.birthdayService.deleteBirthday(birthday.id);
  }

  async deleteEvent(event: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.eventService.deleteEvent(event.id);
  }
}
