import { Component } from '@angular/core';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodosComponent } from './components/todos/todos.component';
import { ContainerComponent } from './components/container/container.component';

@Component({
  selector: 'app-root',
  imports: [
    AddTodoComponent,
    TodosComponent,
    ContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular19-tailwind';
}
