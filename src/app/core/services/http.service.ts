import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  http = inject(HttpClient);

  private Base_URL:string = environment.apiUrl;

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.Base_URL}/${path}`).pipe(
      catchError(this.handleError)
    );
  }

  post<T,B>(path: string, body: B): Observable<T> {
    return this.http.post<T>(`${this.Base_URL}/${path}`, body).pipe(
      catchError(this.handleError)
    );
  }

  put<T,B>(path: string, body: B): Observable<T> {
    console.log(`${this.Base_URL}/${path}`);
    return this.http.put<T>(`${this.Base_URL}/${path}`, body).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.Base_URL}/${path}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => error)
  }

}
