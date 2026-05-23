import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task, TaskRequest } from '../../shared/models/task.model';
import { TaskService } from '../../core/services/task.service';
import { FormsModule } from '@angular/forms';

/**
 * Tasks page component.
 */
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  tasks: Task[] = [];

  newTask: TaskRequest = {
    title: '',
    description: '',
    status: 'PENDING',
  };

  editingTaskId: number | null = null;

  currentPage = 1;
  tasksPerPage = 5;
  showForm = false;

  successMessage = '';

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.sort((a, b) => b.id - a.id);

        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages || 1;
        }

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      },
    });
  }

  createTask(): void {
    if (!this.newTask.title.trim()) {
      alert('El título es obligatorio.');
      return;
    }

    if (!this.newTask.description.trim()) {
      alert('La descripción es obligatoria.');
      return;
    }

    this.taskService.createTask(this.newTask).subscribe({
      next: () => {
        this.loadTasks();

        this.showSuccessMessage('Tarea creada correctamente.');

        this.showForm = false;

        this.newTask = {
          title: '',
          description: '',
          status: 'PENDING',
        };
      },
      error: (error) => {
        console.error('Error creating task:', error);
      },
    });
  }

  deleteTask(id: number): void {
    const confirmed = confirm('¿Deseas eliminar esta tarea?');

    if (!confirmed) {
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();

        this.showSuccessMessage('Tarea eliminada correctamente.');
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      },
    });
  }

  editTask(task: Task): void {
    this.editingTaskId = task.id;
    this.showForm = true;

    this.newTask = {
      title: task.title,
      description: task.description,
      status: task.status,
    };
  }

  updateTask(): void {
    if (this.editingTaskId === null) {
      return;
    }

    if (!this.newTask.title.trim()) {
      alert('El título es obligatorio.');
      return;
    }

    if (!this.newTask.description.trim()) {
      alert('La descripción es obligatoria.');
      return;
    }

    this.taskService.updateTask(this.editingTaskId, this.newTask).subscribe({
      next: () => {
        this.loadTasks();
        this.showSuccessMessage('Tarea actualizada correctamente.');
        this.showForm = false;

        this.editingTaskId = null;

        this.newTask = {
          title: '',
          description: '',
          status: 'PENDING',
        };
      },
      error: (error) => {
        console.error('Error updating task:', error);
      },
    });
  }

  get totalPages(): number {
    return Math.ceil(this.tasks.length / this.tasksPerPage);
  }

  get paginatedTasks(): Task[] {
    const startIndex = (this.currentPage - 1) * this.tasksPerPage;
    const endIndex = startIndex + this.tasksPerPage;

    return this.tasks.slice(startIndex, endIndex);
  }

  get startItem(): number {
    if (this.tasks.length === 0) {
      return 0;
    }

    return (this.currentPage - 1) * this.tasksPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.tasksPerPage, this.tasks.length);
  }

  get itemsCountText(): string {
    if (this.startItem === this.endItem) {
      return `Mostrando ${this.startItem} de ${this.tasks.length} tareas`;
    }

    return `Mostrando ${this.startItem} a ${this.endItem} de ${this.tasks.length} tareas`;
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;

    if (!this.showForm) {
      this.editingTaskId = null;

      this.newTask = {
        title: '',
        description: '',
        status: 'PENDING',
      };
    }
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;

    setTimeout(() => {
      this.successMessage = '';
      this.cdr.detectChanges();
    }, 2500);
  }
}
