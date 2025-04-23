import { Component, inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { TodoService } from '../../todo.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

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
  messageService = inject(MessageService);
  private todoService = inject(TodoService);
  private queryClient = inject(QueryClient);

  title = '';

  addTodoMutation = injectMutation(() => ({
    mutationFn: (newTitle: string) =>
      this.todoService.addTodo({ title: newTitle, completed: false, userId: 1 }),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['todos'] });
      this.title = '';
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Todo added successfully',
        life: 3000,
      });
    },
  }));

  addTodo() {
    if (this.title.trim()) {
      this.addTodoMutation.mutate(this.title);
    }
  }
}
