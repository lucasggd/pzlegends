import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _http: HttpClient) { }

  reportRun(message: string, runId: number): Observable<any> {
    let report: any = {};
    report.message = message;
    report.runId = runId;

    return this._http.post<any>(`http://localhost:8080/run/report`, report);
  }
}
