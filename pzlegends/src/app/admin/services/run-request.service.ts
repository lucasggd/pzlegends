import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RunRequestService {

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/admin/run/request?page=0&limit=10`)
  }

  getById(id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/admin/run/request/${id}`)
  }

  response(id: number, bool: boolean, message?: string): Observable<any> {

    let obj: any = {};
    obj.approved = bool;
    obj.message = message;

    return this._http.post<any>(`http://localhost:8080/admin/run/request/${id}/response`, obj)
  }
}
