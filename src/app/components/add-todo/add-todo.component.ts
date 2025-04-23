import { Component, inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { TodoService } from '../../todo.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-add-todo',
  imports: [
    FormsModule,
    NgIf,
    Button,
    InputText
  ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  private todoService = inject(TodoService);
  private queryClient = inject(QueryClient);

  title = '';

  addTodoMutation = injectMutation(() => ({
    mutationFn: (newTitle: string) =>
      this.todoService.addTodo({ title: newTitle, completed: false, userId: 1 }),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
      this.title = '';
    },
  }));

  addTodo() {
    if (this.title.trim()) {
      this.addTodoMutation.mutate(this.title);
    }
  }
}
