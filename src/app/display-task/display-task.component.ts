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
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.scss'],
})
export class DisplayTaskComponent implements OnChanges {
  @Input() isVisible = false;
  @Input() data: any = null;
  @Output() modalHandler = new EventEmitter();
  title = '';
  hour = '';
  description = '';
  done = 'No';
  backgroundColor = '';

  constructor(private colorService: ColorService) {
    // Subscribe to background color for the modal background color
    this.colorService.backgroundColorChanges.subscribe((value) => {
      this.backgroundColor = value;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.data?.currentValue) {
      this.title = changes.data.currentValue.title;
      this.hour = changes.data.currentValue.hour;
      this.description = changes.data.currentValue.description;
      if (changes.data.currentValue.done) {
        this.done = 'Yes';
      } else {
        this.done = 'No';
      }
    }
  }

  handleCancel() {
    this.data = null;
    this.modalHandler.emit();
  }
}
