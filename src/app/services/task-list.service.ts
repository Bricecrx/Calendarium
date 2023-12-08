/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import tasks from '../../assets/TaskListJson.json';
import { DateService } from './date.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  private taskList: any[] = [];
  private localTaskList: any[] = [];

  localTaskListChanges: Subject<any[]> = new Subject<any[]>();

  constructor(
    private dateService: DateService,
    private firebaseService: FirebaseService
  ) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.firebaseService.getTasks().then((data) => {
      this.taskList = data;
      // Initializes local list
      const date = this.dateService.getSelectedDate();
      for (const task of this.taskList) {
        if (task.data.date === date) {
          this.localTaskList.push(task);
        }
      }
      if (this.localTaskList.length > 0) {
        this.sortByHour();
      }
      // Subscribe to date changes
      this.dateService.dateChanges.subscribe(() => {
        this.localTaskList = [];
        const newDate = this.dateService.getSelectedDate();
        for (const task of this.taskList) {
          if (task.data.date === newDate) {
            this.localTaskList.push(task);
          }
        }
        if (this.localTaskList.length > 0) {
          this.sortByHour();
        }
        this.localTaskListChanges.next(this.localTaskList);
      });
    });
  }

  getTaskList() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.localTaskList;
  }

  async addTask(task: any) {
    // this.taskList.push(task);
    await this.firebaseService.addTask(task);
    await this.updateLocalTaskList();
  }

  async updateTask(task: any) {
    // const index = this.taskList.findIndex((element) => element.id === task.id);
    // this.taskList[index] = task;
    await this.firebaseService.updateTask(task);
    await this.updateLocalTaskList();
  }

  async deleteTask(task: any) {
    // const index = this.taskList.findIndex((element) => element.id === task.id);
    // this.taskList.splice(index, 1);
    await this.firebaseService.deleteTask(task.id);
    await this.updateLocalTaskList();
  }

  async updateLocalTaskList() {
    const newDate = this.dateService.getSelectedDate();
    this.taskList = await this.firebaseService.getTasks();
    this.localTaskList = [];
    for (const task of this.taskList) {
      if (task.data.date === newDate) {
        this.localTaskList.push(task);
      }
    }
    if (this.localTaskList.length > 0) {
      this.sortByHour();
    }
    // Sort local task list by hour
    this.localTaskListChanges.next(this.localTaskList);
  }

  sortByHour() {
    this.localTaskList = this.localTaskList.sort((a, b) => {
      // Case where one or more task do(es) not have an hour
      if (a.data.hour === null) {
        return 1;
      }
      if (b.data.hour === null) {
        return -1;
      }
      // Normal case
      const test = this.compareMoreOrEqual(a.data.hour, b.data.hour);
      if (test) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  compareMoreOrEqual(hourA: string, hourB: string) {
    const hourHourA = Number(hourA.split(':')[0]);
    const hourMinuteA = Number(hourA.split(':')[1]);
    const hourHourB = Number(hourB.split(':')[0]);
    const hourMinuteB = Number(hourB.split(':')[1]);
    if (hourHourA === hourHourB) {
      return hourMinuteA >= hourMinuteB;
    } else {
      return hourHourA >= hourHourB;
    }
  }
}
