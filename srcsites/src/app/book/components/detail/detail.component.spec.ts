import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../../shared/services/book.service";
import {TestBookService} from "../../../shared/services/testing/test-book.service";

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let route: ActivatedRoute
  let router: Router
  let server: BookService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{provide: BookService, useClass: TestBookService}]
    })
      .compileComponents();

    router = TestBed.get(Router)
    route = TestBed.get(ActivatedRoute)
    const spyRoute = spyOn(route.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('62bbf4ab9510cc716a549596')

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    server = TestBed.inject(BookService);
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    done();
    });

    it('should get correct book', (done) => {
      expect(component.book?._id).toEqual('62bbf4ab9510cc716a549596')
      done();
    });

    it('should render title book', (done) => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.bw-home-on-sale-item mat-card-title')?.textContent)
        .toContain('Book title 49');
      done();
    });
});
