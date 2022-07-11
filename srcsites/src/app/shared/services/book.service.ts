import { Injectable } from '@angular/core';
import {BookModel} from "../models/book.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, tap, catchError, of, BehaviorSubject} from "rxjs";
// @ts-ignore
import {PaginationModel} from "../models/pagination.model";

@Injectable({ providedIn: 'root' })
export class BookService {
  private urls = {
    list: 'api/book',
    detail: 'api/book',
    create: 'api/book',
  };

  public pagination = new PaginationModel<BookModel>()
  public subscribeParams
  protected bookSubject: BehaviorSubject<BookModel | null>
  public book: Observable<BookModel | null>

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'secret_key': 'GYqrMHY9q9SHUTuA',
      '_token': localStorage.getItem('_token') || ''
    })
  }

  constructor(
    private http: HttpClient
  ) {
    this.subscribeParams = this.pagination.subscribeParams((next: any) => this.refresh(next))
    this.bookSubject = new BehaviorSubject<BookModel| null>(null)
    this.book = this.bookSubject.asObservable()
  }

  refresh(next: any) {
    const unsubscribe = this.getBooks(next).subscribe(res => {
      this.pagination.data = res.data
      this.pagination.total = res.total
      unsubscribe.unsubscribe()
    })
  }

  getBooks(params: object = {}): Observable<{data: BookModel[], total: number}> {
    return this.http.get(this.urls.list, {
      ...this.httpOptions,
      params: new HttpParams({fromObject: {...params}})
    })
      .pipe(
        tap((_:any) => console.log(_)),
      );
  }

  detail(id: string): Observable<BookModel | null> {
    return this.http.get(this.urls.detail + '/' + id, {
      ...this.httpOptions
    })
      .pipe(
        tap((_:any) => {
          this.bookSubject.next(_)
        })
      );
  }

  create(data: object): Observable<BookModel> {
    return this.http.post(this.urls.create, data, {
      ...this.httpOptions
    })
      .pipe(
        tap((_:any) => {
          this.bookSubject.next(_)
        })
      );
  }
}
