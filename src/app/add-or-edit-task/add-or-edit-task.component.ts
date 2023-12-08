import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskListService } from '../services/task-list.service';
import { DateService } from '../services/date.service';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-add-or-edit-task',
  templateUrl: './add-or-edit-task.component.html',
  styleUrls: ['./add-or-edit-task.component.scss'],
})
export class AddOrEditTaskComponent implements OnChanges, OnInit {
  formData: FormGroup;
  currentDate = '';
  showError = false;

  @Input() isVisible = false;
  @Input() dataId = '';
  @Input() data: any = null;
  @Output() modalHandler = new EventEmitter();

  backgroundColor = '';

  constructor(
    private formBuilder: FormBuilder,
    private taskListService: TaskListService,
    private dateService: DateService,
    private colorService: ColorService
  ) {
    this.formData = this.formBuilder.group({
      title: [this.data?.data?.title || null],
      description: [this.data?.data?.description || null],
      hour: [this.data?.data?.hour || null],
    });
    // Subscribe to background color for the modal background color
    this.colorService.backgroundColorChanges.subscribe((value) => {
      this.backgroundColor = value;
    });
  }

  ngOnInit() {
    // Initialize and subscribe date
    this.currentDate = this.dateService.getSelectedDate();
    this.dateService.dateChanges.subscribe(() => {
      this.currentDate = this.dateService.getSelectedDate();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.data?.currentValue) {
      this.formData.get('title')?.setValue(changes?.data.currentValue.title);
      this.formData
        .get('description')
        ?.setValue(changes.data.currentValue.description);
      this.formData.get('hour')?.setValue(changes.data.currentValue.hour);
    }
  }

  handleCancel() {
    this.data = null;
    this.modalHandler.emit();
  }

  async submit() {
    try {
      // if (this.formData.invalid) {
      //   return;
      // }
      //We do a test with hour format
      if (this.formData.value.hour !== null && !this.testHourFormat()) {
        this.showError = true;
        return;
      }
      if (!this.data) {
        const task = {
          title: this.formData.value.title,
          description: this.formData.value.description,
          date: this.currentDate,
          hour: this.formData.value.hour,
          done: false,
        };
        await this.taskListService.addTask(task);
      } else {
        const task = {
          id: this.dataId,
          data: {
            title: this.formData.value.title,
            description: this.formData.value.description,
            date: this.data.date,
            hour: this.formData.value.hour,
            done: this.data.done,
          },
        };
        await this.taskListService.updateTask(task);
      }
      this.formData.reset();
      this.data = null;
      this.modalHandler.emit();
    } catch (e) {
      console.log('e', e);
    }
  }

  testHourFormat(): boolean {
    const hourTest = this.formData.value.hour.split(':');
    if (hourTest.length !== 2) {
      return false;
    }
    if (hourTest[0].length !== 2 || hourTest[1].length !== 2) {
      return false;
    }
    const hours = hourTest[0];
    const minutes = hourTest[1];
    if (
      !this.testCharacterNumber(hours[0]) ||
      !this.testCharacterNumber(hours[1])
    ) {
      return false;
    }
    if (
      !this.testCharacterNumber(minutes[0]) ||
      !this.testCharacterNumber(minutes[1])
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
