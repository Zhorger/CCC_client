import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/consts';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/message.service';

@Injectable({
  providedIn: 'root'
})
export class DishNBService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }


  getdishNB(header): Observable<any> {
    return this.http.post(API_URL + 'dishNB', header, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched dishNB')),
        catchError(this.handleError<any>('getdishNB',))
      );
  }

  getValues(field): Observable<any> {
    const setFilterUrl = API_URL  + 'dishNB' + '/' + field;
    console.log(setFilterUrl)
    return this.http.get(setFilterUrl, this.httpOptions).pipe(
      tap(_ => this.log('fetched set filter values')),
      catchError(this.handleError<any>('getValues', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message)
    this.messageService.add(`HeroService: ${message}`);
  }
}
