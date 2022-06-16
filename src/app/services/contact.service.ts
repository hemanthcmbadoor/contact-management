import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../model/IContact';
import { IGroup } from '../model/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl:string = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getAllContacts():Observable<IContact[]>{

    let dataURL:string = `${this.serverUrl}/contacts`;
    return this.http.get<IContact[]>(dataURL)
        .pipe(catchError(this.handleError)); 
  }

  getContact(contactId: string):Observable<IContact>{

    let dataURL:string = `${this.serverUrl}/contacts/${contactId}`;
    return this.http.get<IContact>(dataURL)
        .pipe(catchError(this.handleError)); 
  }

  createContact(contact: IContact):Observable<IContact>{

    let dataURL:string = `${this.serverUrl}/contacts`;
    return this.http.post<IContact>(dataURL, contact)
        .pipe(catchError(this.handleError)); 
  }

  updateContact(contact: IContact, contactId: string):Observable<IContact>{

    let dataURL:string = `${this.serverUrl}/contacts/${contactId}`;
    return this.http.put<IContact>(dataURL, contact)
        .pipe(catchError(this.handleError)); 
  }

  deleteContact(contactId: string):Observable<any>{

    let dataURL:string = `${this.serverUrl}/contacts/${contactId}`;
    return this.http.delete<any>(dataURL)
        .pipe(catchError(this.handleError)); 
  }

  getAllGroups():Observable<IGroup[]>{

    let dataURL:string = `${this.serverUrl}/groups`;
    return this.http.get<IGroup[]>(dataURL)
        .pipe(catchError(this.handleError)); 
  }

  getGroup(contact: IContact):Observable<IGroup>{

    let dataURL:string = `${this.serverUrl}/groups/${contact.group_id}`;
    return this.http.get<IGroup>(dataURL)
        .pipe(catchError(this.handleError)); 
  }

  public handleError(error: HttpErrorResponse){

    let errorMessage: string = '';

    if(error.error instanceof ErrorEvent){
      //client error
      errorMessage = `Error : ${error.error.message}`;
    } else {
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
