import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  get<T>(url: string, params?: { [param: string]: any }): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, { params });
  }

  post<T> (url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body);
  }

  postWithCredentials<T> (url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, { withCredentials: true }).pipe(tap(res => console.log('Response from postWithCredentials:', res)));
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string, params?: { [param: string]: any }): Observable<T> {
    return this.http.delete<T>(url, { params });
  }
}
