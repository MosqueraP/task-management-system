import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task } from '../../shared/models/task.model';
import { TaskService } from '../../core/services/task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit {
  tasks: Task[] = [];

  totalTasks = 0;
  pendingTasks = 0;
  completedTasks = 0;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;

        this.totalTasks = data.length;
        this.pendingTasks = data.filter((task) => task.status === 'PENDING').length;
        this.completedTasks = data.filter((task) => task.status === 'COMPLETED').length;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading statistics:', error);
      },
    });
  }
}

