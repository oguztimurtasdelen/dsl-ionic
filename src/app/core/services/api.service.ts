import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: { [param: string]: any }): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, { params });
  }

  post<T> (url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string, params?: { [param: string]: any }): Observable<T> {
    return this.http.delete<T>(url, { params });
  }
}
