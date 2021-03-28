import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_URL = environment.API_URL;
  familyMember:any;

  constructor(
    private http: HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  authenticateUser(uid, pass) {
    const user = {
      user: uid,
      password: pass
    };

    return this.http
      .post<any>(`${this.API_URL}/login`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  //get agency lists
  getAllAgency(){
    return this.http
    .get<any>(`${this.API_URL}/agency`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  getStaffsByAgency(id){
    return this.http
    .get<any>(`${this.API_URL}/staff/${id}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAllStaffs(){
    return this.http
    .get<any>(`${this.API_URL}/staff`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    ) 
  }

  getDrivers(){
    return this.http
    .get<any>(`${this.API_URL}/getdriver`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    ) 
  }

   getCars(){
    return this.http
    .get<any>(`${this.API_URL}/car`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    ) 
  }

  getAllVisitors(){
    return this.http
    .get<any>(`${this.API_URL}/visitor`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }



























  /// end of useful apis


  
}
