import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SendRun } from '../model/send-run';

@Injectable({
  providedIn: 'root'
})
export class SendRunService {

  constructor(private _http: HttpClient) { }

  sendRun(sendRun: SendRun): Observable<any> {
    return this._http.post<any>(`http://localhost:8080/run/request`, sendRun)
  }

}
