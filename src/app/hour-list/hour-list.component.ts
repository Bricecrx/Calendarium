import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from '../home/home.component';
import { TaskListService } from '../services/task-list.service';

@Component({
  selector: 'app-hour-list',
  templateUrl: './hour-list.component.html',
  styleUrls: ['./hour-list.component.scss'],
})
export class HourListComponent implements OnInit {
  taskList: TaskList[] = [];
  selectedTask: any = null;
  isVisibleModal = false;

  constructor(private taskListService: TaskListService) {}

  ngOnInit() {
    this.taskList = this.taskListService.getTaskList();
    this.taskListService.localTaskListChanges.subscribe(() => {
      this.taskList = this.taskListService.getTaskList();
    });
  }

  handleModal() {
    this.isVisibleModal = !this.isVisibleModal;
  }

  displayTask(item: any) {
    this.selectedTask = item;
    this.isVisibleModal = !this.isVisibleModal;
  }

  getHour(): string {
    const date = new Date();
    return String(date.getHours()) + ':' + String(date.getMinutes());
  }

  getDate(): string {
    const date = new Date();
    const unformattedDate = date.toISOString().split('T')[0].split('-');
    const formattedDate =
      unformattedDate[2] + '/' + unformattedDate[1] + '/' + unformattedDate[0];
    return formattedDate;
  }

  strictlySuperiorThanCurrentDate(date: string) {
    const currentDateSplit = this.getDate().split('/');
    const dateSplit = date.split('/');
    if (Number(currentDateSplit[2]) === Number(dateSplit[2])) {
      if (Number(currentDateSplit[1]) === Number(dateSplit[1])) {
        if (Number(dateSplit[0]) < Number(currentDateSplit[0])) {
          return true;
        } else {
          return false;
        }
      } else if (Number(currentDateSplit[1]) > Number(dateSplit[1])) {
        return true;
      } else {
        return false;
      }
    } else if (Number(currentDateSplit[2]) > Number(dateSplit[2])) {
      return true;
    } else {
      return false;
    }
  }

  strictlySuperiorThanCurrentHour(hour: string) {
    const currentHourSplit = this.getHour().split(':');
    const hourSplit = hour.split(':');
    if (hourSplit[0] === currentHourSplit[0]) {
      if (hourSplit[1] < currentHourSplit[1]) {
        return true;
      } else {
        return false;
      }
    } else if (hourSplit[0] < currentHourSplit[0]) {
      return true;
    } else {
      return false;
    }
  }
}
