import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorService } from './handle-error.service';
import { environment as env } from 'src/environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public modalClosed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private http: HttpClient,

    private handleError: HandleErrorService
  ) { }

  doGetAll(url: string): any {
    let res = lastValueFrom(
      this.http.get(`${env.apiRoot}/${url}`)
    )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        this.handleError.logError(error);
      });
    return res;
  }

  doGetLimit(url: string, limit: any): any {
    let res = lastValueFrom(
      this.http.get(`${env.apiRoot}/${url}` + limit)
    )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        this.handleError.logError(error);
      });
    return res;
  }
  
  doPost(url: string, reqBody: any): any {
    let res = lastValueFrom(
      this.http.post(`${env.apiRoot}/${url}`, reqBody)
    )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        this.handleError.logError(error);
      });
    return res;
  }


  doPut(url: string, reqBody: any): any {
    let res = lastValueFrom(
      this.http.put(`${env.apiRoot}/${url}` + reqBody.id, reqBody)
    )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        this.handleError.logError(error);
      });
    return res;
  }

  doDelete(url: string, id: number) {
    let res = lastValueFrom(
      this.http.delete(`${env.apiRoot}/${url}` + id)
    )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        this.handleError.logError(error);
      });
    return res;
  }
}
