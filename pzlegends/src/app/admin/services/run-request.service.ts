import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunRequestService {

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/admin/run/request`)
  }

  getById(id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/admin/run/request/${id}`)
  }

  response(id: number, bool: boolean): Observable<any> {
    return this._http.post<any>(`http://localhost:8080/admin/run/request/${id}/response`, bool)
  }
}
