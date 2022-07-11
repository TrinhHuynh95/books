import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {CartService} from "../../../shared/services/cart.service";
import {BookModel} from "../../../shared/models/book.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  carts!: BookModel[];

  constructor(private authService: AuthService, private cartService: CartService) {
    this.cartService.list.subscribe((x: BookModel[]) => {
      this.carts = x
    });
  }
  ngOnInit(): void {
    this.cartService.getCarts()
  }
  order () {
    const sub = this.cartService.create().subscribe(nex => {
      sub.unsubscribe()
    })
  }

  get total () {
    let total = 0;
    this.carts.forEach(item => total += (item.cart * item.book_price))

    return total
  }
}
