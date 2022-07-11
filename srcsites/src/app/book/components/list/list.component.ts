import { Component, OnInit } from '@angular/core';
import {PaginationModel} from "../../../shared/models/pagination.model";
import {BookModel} from "../../../shared/models/book.model";
import {BookService} from "../../../shared/services/book.service";
import {UserModel} from "../../../shared/models/user.model";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  paginate: PaginationModel<BookModel>;
  oldPageEvent: any = {}
  user!: UserModel | null

  constructor(private bookService: BookService, private authService: AuthService) {
    this.paginate = bookService.pagination
    this.authService.user.subscribe((x: UserModel | null) => this.user = x);
  }

  ngOnInit(): void {
    this.bookService.refresh(this.paginate.params)
  }

  pageEvent = (e: any) => {
    const changed: any = {}
    if (e.pageIndex !== this.oldPageEvent.pageIndex) {
      changed.page = e.pageIndex + 1
    }
    if (e.pageSize !== this.oldPageEvent.pageSize) {
      changed.limit = e.pageSize
    }
    this.oldPageEvent = e
    this.paginate.setParams(changed)
  }

}
