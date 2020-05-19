import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    let currentJWT = localStorage.getItem('currentUserBearer');

    if (currentJWT === null) {
      currentJWT = localStorage.getItem('deviceId');
    }

    if (currentJWT === null) {
      currentJWT = this.setRandomDeviceId();
    }
    if (currentJWT) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentJWT}`
        }
      });
    }

    return next.handle(request);
  }

  private setRandomDeviceId() {
    const deviceId = this.randomString(512, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_!@#$%^&*()');
    const prefix = 'Device_Bearer_';
    localStorage.setItem('deviceId', prefix + deviceId);
    return deviceId;
  }

  private randomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) { result += chars[Math.floor(Math.random() * chars.length)]; }
    return result;
  }
}
