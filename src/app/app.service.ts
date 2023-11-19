import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getLogsData(): Observable<any> {
    var url = 'http://localhost:3000/api/logs';
    return this.http.get<any>(url)
  }

  getSearchDataService(keyword: string, key: string): Observable<any> {
    const url = `http://localhost:3000/api/search?keyword=${keyword}&key=${key}`;
    return this.http.get<any>(url);
  }
}
