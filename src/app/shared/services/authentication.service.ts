import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '../classes/UserInfo';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserInfo>;
  public currentUser: Observable<UserInfo>;

  constructor(private http: HttpClient, private apiService: WebRequestService) {

        this.currentUserSubject = new BehaviorSubject<UserInfo>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserInfo {
      return this.currentUserSubject.value;
  }

login(username: string, password: string) {
   const uri = "authenticate";
    return this.apiService.login(uri,username,password)
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
}

registerUser(user: any)  {
  return this.apiService.registerUser(user);
}

addShippingAddress(address: any) {
  return this.apiService.addShippingAddress(address);
}

getAllAddresses(id:any) {
  return this.apiService.getAllAddresses(id);
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
