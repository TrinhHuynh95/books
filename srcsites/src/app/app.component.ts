import { Component } from '@angular/core';
import {UserModel} from "./shared/models/user.model";
import {AuthService} from "./shared/services/auth.service";
import {CartService} from "./shared/services/cart.service";
import {BookModel} from "./shared/models/book.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Book store';
  user!: UserModel | null;
  carts!: BookModel[];

  constructor(private authService: AuthService, private cartService: CartService) {
    this.authService.user.subscribe((x: UserModel | null) => this.user = x);
    this.cartService.list.subscribe((x: BookModel[]) => {
      this.carts = x
    });
  }

  ngOnInit() {
    const sub = this.authService.logged().subscribe(nex => {
      sub.unsubscribe()
    })
    this.cartService.getCarts()
  }

  get total () {
    let total = 0;
    this.carts.forEach(item => total += item.cart)

    return total
  }

  logout() {
    this.authService.logout();
  }
}
