import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunRequestService {

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/run/request`)
  }

  getById(id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/run/request/${id}`)
  }
}
