import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output()
  isLoggedInEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.isLoggedIn();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.baseUrl}/auth/login`, { username, password }, )
      .pipe(map(response => {
        // login successful if there's a user in the response
        if (response && response.token != null) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          localStorage.setItem('currentUserBearer', response.token);
          this.isLoggedIn();
        }

        return response;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserBearer');
    this.isLoggedIn();
  }

  isLoggedIn(): void {
    // get login status from service
    const isLoggedIn = localStorage.getItem('currentUserBearer') !== null;
    this.isLoggedInEmitter.emit(isLoggedIn);
  }
}
