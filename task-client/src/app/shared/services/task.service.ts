import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  getTasks(): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http
      .get<Task[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  getTask(id: string): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Task>(url)
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  createTask(task: Task): Promise<any> {
    return this.http
      .post<Task>(this.apiUrl, task)
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  updateTask(id: string, task: Task): Promise<any> {
    console.log(id);
    console.log(task);

    const url = `${this.apiUrl}/${id}`;
    return this.http
      .put<Task>(url, task)
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  deleteTask(id: string): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete<any>(url)
      .pipe(catchError(this.handleError))
      .toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error:', error.error.message);
    } else {
      console.error(
        `Código de error ${error.status}, ` + `mensaje: ${error.error}`
      );
    }
    return throwError(
      'Algo salió mal. Por favor, inténtalo de nuevo más tarde.'
    );
  }
}
