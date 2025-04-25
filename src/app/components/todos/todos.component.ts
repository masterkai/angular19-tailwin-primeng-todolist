import {Component, inject, OnInit} from '@angular/core';
import {Todo, TodoService} from '../../todo.service';
import {injectMutation, injectQuery, QueryClient} from '@tanstack/angular-query-experimental';
import { NgForOf, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-todos',
  imports: [
    NgIf,
    TableModule,
    ToggleSwitch,
    FormsModule,
    Button,
    InputText
  ],
  templateUrl: './todos.component.html',
  standalone: true,
  styleUrl: './todos.component.css'
})
export class TodosComponent {

  messageService = inject(MessageService);
  private queryClient = inject(QueryClient);
  private todoService = inject(TodoService);

  todosQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.getTodos().then(res=> res.map((todo: Todo) => ({...todo, isEditing: false} as Todo))),
  }));

  // update Todo Mutation
  updateTodoMutation = injectMutation(() => ({
    mutationFn: (todo: Todo) => this.todoService.updateTodo(todo),
    onSuccess: (savedTodo, newTodo) => {
      this.queryClient.invalidateQueries(
        {queryKey: ['todos']},
      ).then(r =>{
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Todo updated successfully',
          life: 3000,
        });
      })
     },
  }));


}
