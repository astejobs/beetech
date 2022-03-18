import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const account = this.authService.currentUserValue;
    const isLoggedIn = account?.token;
    //const isApiUrl = request.url.startsWith(environment.adminUrl);
    const patTmUrl = request.url.startsWith(environment.paytmUrl);
    if(patTmUrl) {
        request = request.clone({
            setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    } else {
        if (isLoggedIn) {  //&& isApiUrl
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${account.token}` }
            });
        }
    }

    return next.handle(request);
}
}
