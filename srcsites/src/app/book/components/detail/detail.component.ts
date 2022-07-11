import { Component, OnInit } from '@angular/core';
import {BookModel} from "../../../shared/models/book.model";
import {UserModel} from "../../../shared/models/user.model";
import {BookService} from "../../../shared/services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../shared/services/cart.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  book!: BookModel | null;
  user!: UserModel | null;

  constructor(private bookService: BookService, private router: Router, private activeRouter: ActivatedRoute, private cartService: CartService, private authService: AuthService) {
    this.bookService.book.subscribe((x: BookModel | null) => this.book = x);
    this.authService.user.subscribe((x: UserModel | null) => this.user = x);
  }

  ngOnInit(): void {
    const _id = this.activeRouter.snapshot.paramMap.get('_id')
    if (_id) {
      const sub = this.bookService.detail(_id).subscribe(nex => {
        sub.unsubscribe()
      })
    }
  }

  addCart (book: BookModel) {
    if (this.user) {
      if (book.quantity > 0) {
        this.cartService.addCart(book)
        book.quantity--
      }
    } else {
      this.router.navigate(['/login'])
    }
  }

}
