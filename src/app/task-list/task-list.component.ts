import { Component, OnInit } from '@angular/core';
import { TaskList } from '../home/home.component';
import { TaskListService } from '../services/task-list.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  taskList: TaskList[] = [];
  selectedDate = '';
  isVisibleModal = false;
  isVisibleModalDisplay = false;
  selectedTask: any = null;
  selectedTaskDisplay: any = null;

  constructor(
    private taskListService: TaskListService,
    private dateService: DateService,
  ) {}

  ngOnInit() {
    // Initialize and subscribe date
    this.selectedDate = this.dateService.getSelectedDate();
    this.dateService.dateChanges.subscribe(() => {
      this.selectedDate = this.dateService.getSelectedDate();
    });
    // Initialize and subscribe tasks
    this.taskList = this.taskListService.getTaskList();
    this.taskListService.localTaskListChanges.subscribe(() => {
      this.taskList = this.taskListService.getTaskList();
    });
  }

  modify(item: any) {
    this.selectedTask = item;
    this.isVisibleModal = !this.isVisibleModal;
  }

  displayInfo(item: any) {
    this.selectedTaskDisplay = item;
    this.isVisibleModalDisplay = !this.isVisibleModalDisplay;
  }

  async delete(item: any) {
    await this.taskListService.deleteTask(item);
  }

  async updateDone(item: any) {
    const task = {
      id: item.id,
      data: {
        title: item?.data.title,
        description: item?.data.description,
        date: item?.data.date,
        hour: item?.data.hour,
        done: !item?.data.done,
      },
    };
    await this.taskListService.updateTask(task);
  }

  handleModal() {
    this.isVisibleModal = !this.isVisibleModal;
  }

  handleModalDisplay() {
    this.isVisibleModalDisplay = !this.isVisibleModalDisplay;
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
