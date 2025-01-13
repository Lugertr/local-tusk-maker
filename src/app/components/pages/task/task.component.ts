import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskEditComponent } from './task-edit/task-edit.component';

@Component({
  selector: 'app-task',
  imports: [TaskEditComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  
}
