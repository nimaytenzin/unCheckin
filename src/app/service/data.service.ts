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

  postAgency(item){
    return this.http
    .post<any>(`${this.API_URL}/agency`,item,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateAgncy(id,item){
    return this.http
    .put<any>(`${this.API_URL}/agency/${id}`,item,this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteAgency(id){
    return this.http.delete<any>(`${this.API_URL}/agency/${id}`,this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }


  //employee

  getStaffsByAgency(id){
    return this.http
    .get<any>(`${this.API_URL}/staff/${id}`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
  addNewEmployee(item){
    return this.http
    .post<any>(`${this.API_URL}/staff`,item,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id){
    return this.http.delete<any>(`${this.API_URL}/staff/${id}`,this.httpOptions).pipe(
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
  updateEmployee(id,item){
    return this.http
    .put<any>(`${this.API_URL}/staff/${id}`,item,this.httpOptions).pipe(
      catchError(this.handleError)
    );
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

  postVehicle(item){
    return this.http
    .post<any>(`${this.API_URL}/car`,item,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateVehicle(id,item){
    return this.http
    .put<any>(`${this.API_URL}/car/${id}`,item,this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  postNewVisitor(item){
    return this.http
      .post<any>(`${this.API_URL}/visitor`,item,this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteVehicle(id){
    return this.http
    .delete<any>(`${this.API_URL}/car/${id}`,this.httpOptions).pipe(
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


  getTodaysLog(){
    return this.http
    .get<any>(`${this.API_URL}/checkbydate`, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  logVisitor(item){
    return this.http
    .post<any>(`${this.API_URL}/check`,item,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }



























  /// end of useful apis


  
}
