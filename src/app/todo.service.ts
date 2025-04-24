import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment.development';

export interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'https://localhost:7296/api';

  constructor(private http: HttpClient) {}

  getTodos() {
    // const headers = { 'Content-Type': 'application/json' };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return lastValueFrom(this.http.get<Todo[]>(this.baseUrl + '/TodoItems', { headers }));
    return lastValueFrom(this.http.get<Todo[]>(this.baseUrl+"/TodoItems", { headers }));
  }

  addTodo(todo: Partial<Todo>) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return lastValueFrom(this.http.post<Todo>(this.baseUrl+"/TodoItems", todo, { headers }));
  }
}
