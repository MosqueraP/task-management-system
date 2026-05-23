import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  tasks: Task[] = [];

  totalTasks = 0;
  pendingTasks = 0;
  completedTasks = 0;
  createdTasks = 0;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;

        this.totalTasks = data.length;
        this.pendingTasks = data.filter((task) => task.status === 'PENDING').length;
        this.completedTasks = data.filter((task) => task.status === 'COMPLETED').length;
        this.createdTasks = data.length;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      },
    });
  }
}
