import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopRunsService {

  constructor(private _http: HttpClient) { }

  getTopRuns(id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/category/${id}/runs`)
  }

  getRun(id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/run/${id}`)
  }


}
