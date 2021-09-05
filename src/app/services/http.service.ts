import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorInterface } from './http.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  errorMessageContents: HttpErrorInterface = {
    title: '',
    message: '',
    button: '',
  };
  showHttpErrorMessage = new BehaviorSubject<HttpErrorInterface>(
    this.errorMessageContents
  );

  public runHttpCall(
    method: string,
    endpoint: string,
    contentType: string,
    body?: string,
    params?: HttpParams
  ): Observable<any> {
    const url = `https://pokeapi.co/api/v2${endpoint}`;
    const headers = new HttpHeaders({
      // Authorization: this._loginQuery.getValue().uid || '',
      // Authorization: `Bearer ${this._loginQuery.getValue().firebaseToken}`,
      // Authorization: `Bearer ${ this.token }`,
      // 'Content-Type': contentType,
      // 'x-api-key': environment.tapsAPI.apiKey,
    });

    switch (method) {
      case 'GET':
        return this.http.get<any>(url, { headers, params });
      case 'POST':
        return this.http.post<any>(url, JSON.stringify(body), {
          headers,
          params,
        });
      case 'PUT':
        return this.http.put<any>(url, JSON.stringify(body), {
          headers,
          params,
        });
      case 'DELETE':
        return this.http.delete<any>(url, {
          headers,
          params,
        });
      default:
        return this.http.get<any>(url, { headers, params });
    }
  }
}
