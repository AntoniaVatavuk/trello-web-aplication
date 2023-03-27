import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  // authenticated = false;

  constructor(private http: HttpClient) {
  }

  public saveDataToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getDataToLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
  public removeDataToLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  public clearDataToLocalStorage() {
    localStorage.clear();
  }

  // authenticate(credentials, callback) {

  //       const headers = new HttpHeaders(credentials ? {
  //           authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
  //       } : {});

  //       this.http.get('user', {headers: headers}).subscribe(response => {
  //           if (response['name']) {
  //               this.authenticated = true;
  //           } else {
  //               this.authenticated = false;
  //           }
  //           return callback && callback();
  //       });

  //   }

}