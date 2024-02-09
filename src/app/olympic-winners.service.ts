import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from './consts';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class OlympicWinnersService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }


  getDish(header): Observable<any> {
    return this.http.post(API_URL  + 'olympicWinners', header, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched Table')),
        catchError(this.handleError<any>('getTable',))
      );
  }

  getValues(field): Observable<any> {
    const setFilterUrl = API_URL  + 'olympicWinners' + '/' + field;
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
