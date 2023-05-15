import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import 'devextreme/data/odata/store';
import { Task, TaskService } from 'src/app/shared/services/task.service';

@Component({
  templateUrl: 'tasks.component.html',
})
export class TasksComponent {
  dataSource: any;

  customersData: any;

  shippersData: any;

  refreshModes: string[] = [];

  refreshMode: string = 'reshape';
  requests: string[] = [];

  constructor(private taskService: TaskService) {
    this.refreshMode = 'reshape';
    this.refreshModes = ['full', 'reshape', 'repaint'];
    this.dataSource = new CustomStore({
      key: '_id',
      load: (loadOptions: any) => {
        return this.taskService.getTasks();
      },

      byKey: (key: string) => {
        return this.taskService.getTask(key);
      },

      insert: (task: any) => {
        return this.taskService.createTask(task);
      },

      update: (key: string, values: Task) => {
        return this.taskService.updateTask(key, values);
      },

      remove: (key: string) => {
        return this.taskService.deleteTask(key);
      },
    });
  }

}
