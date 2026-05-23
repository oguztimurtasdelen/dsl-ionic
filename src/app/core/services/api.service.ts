import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SessionService } from './session.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  get<T>(url: string, params?: { [param: string]: any }): Observable<T> {
    /*const token = this.sessionService.accessToken;
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    */
    return this.http.get<T>(`${this.baseUrl}/${url}`, { params, withCredentials: true});
  }

  post<T> (url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, { withCredentials: true });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string, params?: { [param: string]: any }): Observable<T> {
    return this.http.delete<T>(url, { params });
  }

  refreshToken(): Observable<{ accessToken: string }> {

    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/authentication/refresh`,{},{withCredentials: true}
    );
  }
}
