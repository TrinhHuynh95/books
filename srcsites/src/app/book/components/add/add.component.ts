import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BookService} from "../../../shared/services/book.service";
import msg from "../../../shared/helpers/msg";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  categories = [{
    "_id": "62bbf4ab9510cc716a54955e",
    "category_name": "drama"
  },{
    "_id": "62bbf4ab9510cc716a54955f",
    "category_name": "comedy"
  },{
    "_id": "62bbf4ab9510cc716a549560",
    "category_name": "sport"
  }]
  form: FormGroup = new FormGroup({
    book_title: new FormControl('', [
      Validators.required
    ]),
    category_id: new FormControl('', [
      Validators.required
    ]),
    book_summary: new FormControl(''),
    book_price: new FormControl(null, [
      Validators.required
    ]),
    quantity: new FormControl(null, [
      Validators.required
    ]),
  });
  error: string[] = []

  constructor(private bookService: BookService, private router: Router) {
  }

  submit() {
    this.error = [];
    if (this.form.valid) {
      const subscribe = this.bookService.create(this.form.value)
        .subscribe(res => {
          this.router.navigateByUrl('/');
          subscribe.unsubscribe()
        })
    } else {
      for (const k in this.form.get('book_title')?.errors) {
        this.error.push(msg('Title')(['validate', k], ''))
      }
      for (const k in this.form.get('category_id')?.errors) {
        this.error.push(msg('Category')(['validate', k], ''))
      }
      for (const k in this.form.get('book_price')?.errors) {
        this.error.push(msg('Price')(['validate', k], ''))
      }
      for (const k in this.form.get('quantity')?.errors) {
        this.error.push(msg('Quantity')(['validate', k], ''))
      }
    }
  }
}
