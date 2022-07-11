import { TestBed } from '@angular/core/testing';

import { UnAuthGuard } from './un-auth.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UnAuthGuard', () => {
  let guard: UnAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
    guard = TestBed.inject(UnAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
