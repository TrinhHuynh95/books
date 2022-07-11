import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, map, catchError, of, tap} from "rxjs";
import {UserModel} from "../models/user.model";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urls = {
    logged: 'auth/logged',
    register: 'auth/register',
    login: 'auth/login'
  }

  get httpOptions () {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'secret_key': 'GYqrMHY9q9SHUTuA',
        '_token': localStorage.getItem('_token') || ''
      })
    }
  }
  private userSubject: BehaviorSubject<UserModel | null>
  public user: Observable<UserModel | null>
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<UserModel| null>(null)
    this.user = this.userSubject.asObservable()
  }

  get userLogged(): UserModel | null {
    return this.userSubject.value
  }

  login(email: string, pw: string) {
    return this.http.post<{ profile: UserModel, _token: string }>(this.urls.login, {email, pw})
      .pipe(tap(data => {
        localStorage.setItem('_token', data._token);
        this.userSubject.next(data.profile);
      }), catchError((e, c) => {
        return of({...e.error})
      }));
  }
  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
  logged() : Observable<boolean> {
    return this.http.get<{ profile: UserModel, _token: string }>(this.urls.logged, {
      ...this.httpOptions
    })
      .pipe(map(data => {
        this.userSubject.next(data.profile);
        localStorage.setItem('_token', data._token);
        return true;
      }), catchError((e, c) => {
        this.userSubject.next(null);
        return of(false)
      }))
  }
  register(user: UserModel) {
    return this.http.post<{ profile: UserModel, _token: string }>(this.urls.register, { ...user })
      .pipe(tap(data => {
        localStorage.setItem('_token', data._token);
        this.userSubject.next(data.profile);
      }), catchError((e, c) => of({...e.error})));
  }
}
