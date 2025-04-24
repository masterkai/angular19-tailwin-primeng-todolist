import { Component, inject } from '@angular/core';
import { TodoService } from '../../todo.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NgForOf, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-todos',
  imports: [
    NgIf,
    TableModule
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  private todoService = inject(TodoService);

  todosQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.getTodos(),
  }));
}
