import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: {}
      };
    }
    if (params) {
      reqOpts.params = params;

    }

    return this.http.get(this.apiUrl + '/' + endpoint, reqOpts).pipe(
      map(res => JSON.stringify(res))
    ).toPromise();
  }

}
