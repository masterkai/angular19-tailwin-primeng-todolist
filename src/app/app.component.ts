import { Component } from '@angular/core';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodosComponent } from './components/todos/todos.component';
import { ContainerComponent } from './components/container/container.component';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    AddTodoComponent,
    TodosComponent,
    ContainerComponent,
    Toast
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular19-tailwind-prime-ng TanStack Query Todo App';
}
