import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {getTestBooks} from "./testing/test-books";
import {asyncData} from "../helpers/testing";

describe('BookService', () => {
  let service: BookService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new BookService(httpClientSpy);
  });

  it('should return expected books', (done: DoneFn) => {
    const expected = getTestBooks();
    httpClientSpy.get.and.returnValue(asyncData(expected));
    service.getBooks({}).subscribe(
      next => {
        expect(next)
          .withContext('expected books')
          .toEqual(expected)
        done();
      }
    )
  });

  it('should return expected book', (done: DoneFn) => {
    const expected = getTestBooks();
    httpClientSpy.get.and.returnValue(asyncData(expected.data[0]));
    service.detail(expected.data[0]._id).subscribe(
      next => {
        expect(next)
          .withContext("expected book")
          .toEqual(expected.data[0])
        done();
      }
    )
  });

});

