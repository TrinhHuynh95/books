import { Injectable } from '@angular/core';
import {BookModel} from "../models/book.model";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private urls = {
    create: 'api/cart'
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'secret_key': 'GYqrMHY9q9SHUTuA',
      '_token': localStorage.getItem('_token') || ''
    })
  }

  private listSubject: BehaviorSubject<BookModel[]>
  public list: Observable<BookModel[]>

  constructor(
    private http: HttpClient
  ) {
    this.listSubject = new BehaviorSubject<BookModel[]>([])
    this.list = this.listSubject.asObservable()
  }

  getCarts() {
    const str = localStorage.getItem('carts')
    if (!str) {
      return []
    }
    const l = JSON.parse(str)
    this.listSubject.next(l)

    return l
  }

  addCart(book: BookModel) {
    const str = localStorage.getItem('carts')
    let l = []
    if (str) {
      l = JSON.parse(str)
    }
    const find = l.find((item: { _id: string; }) => item._id === book._id)
    if (find) {
      find.cart++;
    } else {
      book.cart = 1;
      l.push(book)
    }
    this.listSubject.next(l)
    localStorage.setItem('carts', JSON.stringify(l));
  }

  create(): Observable<BookModel> {
    return this.http.post(this.urls.create, {list: this.listSubject.value.map(item => ({_id: item._id, cart: item.cart}))}, {
      ...this.httpOptions
    })
      .pipe(
        tap((_:any) => {
          localStorage.setItem('carts', JSON.stringify([]));
          this.listSubject.next([])
        })
      );
  }
}
