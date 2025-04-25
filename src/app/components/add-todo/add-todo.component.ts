import { Component, inject } from '@angular/core';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import {Todo, TodoService} from '../../todo.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-todo',
  imports: [
    FormsModule,
    NgIf,
    Button,
    InputText
  ],
  templateUrl: './add-todo.component.html',
  standalone: true,
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  messageService = inject(MessageService);
  private todoService = inject(TodoService);
  private queryClient = inject(QueryClient);

  title = '';

  addTodoMutation = injectMutation<Todo,Error,Todo, AddTodoContext>(() => ({
    mutationFn: (todo: Todo) =>
      this.todoService.addTodo(todo),
    onMutate: (newTodo) => {
      const loadingNewTodo = { ...newTodo, title: 'loading...' };
      const previousTodos = this.queryClient.getQueryData<Todo[]>(['todos'])|| [];
      this.queryClient.setQueryData<Todo[]>(['todos'], (old: Todo[] | undefined) => {
        return [loadingNewTodo,...(old ?? [])];
      });
      this.title = '';
      return { previousTodos };
    },
    onSuccess: ( savedTodo, newTodo ) => {
      this.queryClient.setQueryData<Todo[]>(['todos'], (old: Todo[] | undefined) => {
        return old?.map(todo => todo.id === newTodo.id ? savedTodo : todo);
      });
      // this.queryClient.invalidateQueries({ queryKey: ['todos'] });
      // this.title = '';
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Todo added successfully',
        life: 3000,
      });
    },
    onError: (error, newTodo, context) => {
      if (!context) {
        return;
      }
      this.queryClient.setQueryData<Todo[]>(['todos'], context?.previousTodos);
      this.messageService.add({
        severity: 'error',
        summary: 'Error: ' + error.message,
        detail: 'Failed to add todo',
        life: 3000,
      });
    },
  }));

  addTodo() {
    if (this.title.trim()) {
      this.addTodoMutation.mutate({ title: this.title, isComplete: false, id: uuidv4(), createdAt: new Date().toISOString() });
    }
  }
}

interface AddTodoContext {
  previousTodos: Todo[];
}
