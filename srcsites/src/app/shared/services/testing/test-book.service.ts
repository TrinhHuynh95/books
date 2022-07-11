import { Injectable } from '@angular/core';

import {Observable, tap} from 'rxjs';

import { BookModel } from '../../models/book.model';
import { BookService } from '../book.service';
import { getTestBooks } from './test-books';
import {asyncData} from "../../helpers/testing";

@Injectable()
export class TestBookService extends BookService {
  paginationBooks = getTestBooks();

  override getBooks(params: object = {}): Observable<{data: BookModel[], total: number}> {
    return asyncData(this.paginationBooks)
  }

  override detail(id: string): Observable<BookModel | null> {
    const item = this.paginationBooks.data.find(item => {
      return item._id === id
    })
    return asyncData(item || null).pipe(
      tap(_ => {
        this.bookSubject.next(_)
      })
    )
  }
}
