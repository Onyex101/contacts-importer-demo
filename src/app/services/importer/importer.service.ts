import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImporterService {

  private rootUrl: string;
  private payload: any;

  constructor(
    private http: HttpClient
  ) {
    this.rootUrl = 'https://contacts-importer-api.herokuapp.com/api/contacts';
    this.payload = {
      service: 'gmail',
      type: '',
      consumerkey: '54817295882-1k5qrjo33og0hht9kmingeddrom3458t.apps.googleusercontent.com',
      consumersecret: '58IPMHkdFm_FPsxB9nuxGrYH',
      returnurl: 'https://onyex101.github.io/contacts-importer-demo',
      token: '',
    }
  }

  post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(url, data).subscribe((res: any) => {
        resolve(res);
      }, err => reject(err));
    });
  }

  getAuthUrl() {
    this.payload.type = 'authenticationurl';
    return new Promise((resolve, reject) => {
      this.post(this.rootUrl, this.payload).then((res: any) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
    });
  }

  sendToken(token) {
    this.payload.type = 'accesstoken';
    this.payload.token = token;
    return new Promise((resolve, reject) => {
      this.post(this.rootUrl, this.payload).then((res: any) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
    });
  }
}
