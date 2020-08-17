import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './commonService';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private headers;
  constructor(private http: HttpClient, private _commonService: CommonService) {
    this.setHttpHeaders();
  }

  setHttpHeaders() {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + this._commonService.authToken);
  }

  public get(url: string): Observable<any> {
    return this.http.get(url, { headers: this.headers });
  }

  public post(url: string, data: any): Observable<any> {
    return this.http.post(url, data, { headers: this.headers });
  }
}
