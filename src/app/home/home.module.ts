import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TaskListModule } from '../task-list/task-list.module';
import { HourListModule } from '../hour-list/hour-list.module';
import { AddOrEditTaskModule } from '../add-or-edit-task/add-or-edit-task.module';
import { CalendarModule } from '../calendar/calendar.module';
import { ImageShowerModule } from '../image-shower/image-shower.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';

import { PlusCircleOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { SettingModule } from '../setting/setting.module';

const icons: IconDefinition[] = [ PlusCircleOutline, SettingOutline ];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NzTabsModule,
    NzButtonModule,
    TaskListModule,
    HourListModule,
    AddOrEditTaskModule,
    CalendarModule,
    ImageShowerModule,
    SettingModule,
    NzIconModule,
    NzIconModule.forRoot(icons),
  ],
})
export class HomeModule {}
