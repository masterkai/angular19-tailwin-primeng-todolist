import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodos() {
    return lastValueFrom(this.http.get<Todo[]>(this.baseUrl));
  }

  addTodo(todo: Partial<Todo>) {
    return lastValueFrom(this.http.post<Todo>(this.baseUrl, todo));
  }
}
