import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/category`)
  }

  getCategory(id: number): Observable<any> {
    return this._http.get<any>(`http://localhost:8080/category/${id}`)
  }
}
