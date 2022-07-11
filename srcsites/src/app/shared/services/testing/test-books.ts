import {BookModel} from "../../models/book.model";

/** return fresh array of test heroes */
export function getTestBooks(): { data: BookModel[], total: number} {
  return {
    "total":
      52, "data":
      [{
        "_id": "62bbf4ab9510cc716a549597",
        "category_id": "62bbf4ab9510cc716a54955e",
        "author_id": "62bbf4ab9510cc716a549565",
        "book_title": "Book title 50",
        "book_summary": "Book Description 50",
        "book_price": 86,
        "quantity": 146,
        "create_at": "2022-06-29T06:43:55.733Z",
        "update_at": "2022-06-29T06:43:55.733Z",
        "book_cover_photo_url": "http://localhost:4200/assets/images/no-image.png",
        "author": {
          "_id": "62bbf4ab9510cc716a549565",
          "author_name": "Mickey Lend 5",
          "author_bio": "Author Bio5",
          "create_at": "2022-06-29T06:43:55.611Z",
          "update_at": "2022-06-29T06:43:55.611Z",
          "avatar_url": "http://localhost:4200/assets/images/no-image.png"
        },
        "category": {
          "_id": "62bbf4ab9510cc716a54955e",
          "category_name": "drama",
          "category_desc": "drama",
          "create_at": "2022-06-29T06:43:55.538Z",
          "update_at": "2022-06-29T06:43:55.538Z"
        },
        "cart": 0
      }, {
        "_id": "62bbf4ab9510cc716a549596",
        "category_id": "62bbf4ab9510cc716a54955f",
        "author_id": "62bbf4ab9510cc716a549562",
        "book_title": "Book title 49",
        "book_summary": "Book Description 49",
        "book_price": 260,
        "quantity": 160,
        "create_at": "2022-06-29T06:43:55.733Z",
        "update_at": "2022-06-29T06:43:55.733Z",
        "book_cover_photo_url": "http://localhost:4200/assets/images/no-image.png",
        "author": {
          "_id": "62bbf4ab9510cc716a549562",
          "author_name": "Mickey Lend 2",
          "author_bio": "Author Bio2",
          "create_at": "2022-06-29T06:43:55.610Z",
          "update_at": "2022-06-29T06:43:55.610Z",
          "avatar_url": "http://localhost:4200/assets/images/no-image.png"
        },
        "category": {
          "_id": "62bbf4ab9510cc716a54955f",
          "category_name": "comedy",
          "category_desc": "comedy",
          "create_at": "2022-06-29T06:43:55.538Z",
          "update_at": "2022-06-29T06:43:55.538Z"
        },
        "cart": 0
      }, {
        "_id": "62bbf4ab9510cc716a549595",
        "category_id": "62bbf4ab9510cc716a54955e",
        "author_id": "62bbf4ab9510cc716a549561",
        "book_title": "Book title 48",
        "book_summary": "Book Description 48",
        "book_price": 188,
        "quantity": 95,
        "create_at": "2022-06-29T06:43:55.733Z",
        "update_at": "2022-06-29T06:43:55.733Z",
        "book_cover_photo_url": "http://localhost:4200/assets/images/no-image.png",
        "author": {
          "_id": "62bbf4ab9510cc716a549561",
          "author_name": "Mickey Lend 1",
          "author_bio": "Author Bio1",
          "create_at": "2022-06-29T06:43:55.610Z",
          "update_at": "2022-06-29T06:43:55.610Z",
          "avatar_url": "http://localhost:4200/assets/images/no-image.png"
        },
        "category": {
          "_id": "62bbf4ab9510cc716a54955e",
          "category_name": "drama",
          "category_desc": "drama",
          "create_at": "2022-06-29T06:43:55.538Z",
          "update_at": "2022-06-29T06:43:55.538Z"
        },
        "cart": 0
      }, {
        "_id": "62bbf4ab9510cc716a549594",
        "category_id": "62bbf4ab9510cc716a549560",
        "author_id": "62bbf4ab9510cc716a549562",
        "book_title": "Book title 47",
        "book_summary": "Book Description 47",
        "book_price": 65,
        "quantity": 0,
        "create_at": "2022-06-29T06:43:55.733Z",
        "update_at": "2022-06-29T06:43:55.733Z",
        "book_cover_photo_url": "http://localhost:4200/assets/images/no-image.png",
        "author": {
          "_id": "62bbf4ab9510cc716a549562",
          "author_name": "Mickey Lend 2",
          "author_bio": "Author Bio2",
          "create_at": "2022-06-29T06:43:55.610Z",
          "update_at": "2022-06-29T06:43:55.610Z",
          "avatar_url": "http://localhost:4200/assets/images/no-image.png"
        },
        "category": {
          "_id": "62bbf4ab9510cc716a549560",
          "category_name": "sport",
          "category_desc": "sport",
          "create_at": "2022-06-29T06:43:55.538Z",
          "update_at": "2022-06-29T06:43:55.538Z"
        },
        "cart": 0
      }, {
        "_id": "62bbf4ab9510cc716a549593",
        "category_id": "62bbf4ab9510cc716a549560",
        "author_id": "62bbf4ab9510cc716a549562",
        "book_title": "Book title 46",
        "book_summary": "Book Description 46",
        "book_price": 218,
        "quantity": 123,
        "create_at": "2022-06-29T06:43:55.733Z",
        "update_at": "2022-06-29T06:43:55.733Z",
        "book_cover_photo_url": "http://localhost:4200/assets/images/no-image.png",
        "author": {
          "_id": "62bbf4ab9510cc716a549562",
          "author_name": "Mickey Lend 2",
          "author_bio": "Author Bio2",
          "create_at": "2022-06-29T06:43:55.610Z",
          "update_at": "2022-06-29T06:43:55.610Z",
          "avatar_url": "http://localhost:4200/assets/images/no-image.png"
        },
        "category": {
          "_id": "62bbf4ab9510cc716a549560",
          "category_name": "sport",
          "category_desc": "sport",
          "create_at": "2022-06-29T06:43:55.538Z",
          "update_at": "2022-06-29T06:43:55.538Z"
        },
        "cart": 0
      }, {
        "_id": "62bbf4ab9510cc716a549592",
        "category_id": "62bbf4ab9510cc716a54955e",
        "author_id": "62bbf4ab9510cc716a549562",
        "book_title": "Book title 45",
        "book_summary": "Book Description 45",
        "book_price": 161,
        "quantity": 98,
        "create_at": "2022-06-29T06:43:55.732Z",
        "update_at": "2022-06-29T06:43:55.732Z",
        "book_cover_photo_url": "http://localhost:4200/assets/images/no-image.png",
        "author": {
          "_id": "62bbf4ab9510cc716a549562",
          "author_name": "Mickey Lend 2",
          "author_bio": "Author Bio2",
          "create_at": "2022-06-29T06:43:55.610Z",
          "update_at": "2022-06-29T06:43:55.610Z",
          "avatar_url": "http://localhost:4200/assets/images/no-image.png"
        },
        "category": {
          "_id": "62bbf4ab9510cc716a54955e",
          "category_name": "drama",
          "category_desc": "drama",
          "create_at": "2022-06-29T06:43:55.538Z",
          "update_at": "2022-06-29T06:43:55.538Z"
        },
        "cart": 0
      }, {
        "_id": "62bbf4ab9510cc716a549591",
        "category_id": "62bbf4ab9510cc716a54955f",
        "author_id": "62bbf4ab9510cc716a549564",
        "book_title": "Book title 44",
        "book_summary": "Book Description 44",
        "book_price": 47,
        "quantity": 203,
        "create_at": "2022-06-29T06:43:55.732Z",
        "update_at": "2022-06-29T06:43:55.732Z",
        "book_cover_photo_url": "http://localhost:4200/assets/images/no-image.png",
        "author": {
          "_id": "62bbf4ab9510cc716a549564",
          "author_name": "Mickey Lend 4",
          "author_bio": "Author Bio4",
          "create_at": "2022-06-29T06:43:55.611Z",
          "update_at": "2022-06-29T06:43:55.611Z",
          "avatar_url": "http://localhost:4200/assets/images/no-image.png"
        },
        "category": {
          "_id": "62bbf4ab9510cc716a54955f",
          "category_name": "comedy",
          "category_desc": "comedy",
          "create_at": "2022-06-29T06:43:55.538Z",
          "update_at": "2022-06-29T06:43:55.538Z"
        },
        "cart": 0
      }, {
        "_id": "62bbf4ab9510cc716a549590",
        "category_id": "62bbf4ab9510cc716a54955e",
        "author_id": "62bbf4ab9510cc716a549565",
        "book_title": "Book title 43",
        "book_summary": "Book Description 43",
        "book_price": 148,
        "quantity": 175,
        "create_at": "2022-06-29T06:43:55.732Z",
        "update_at": "2022-06-29T06:43:55.732Z",
        "book_cover_photo_url": "http://localhost:4200/assets/images/no-image.png",
        "cart": 0,
        "author": {
          "_id": "62bbf4ab9510cc716a549565",
          "author_name": "Mickey Lend 5",
          "author_bio": "Author Bio5",
          "create_at": "2022-06-29T06:43:55.611Z",
          "update_at": "2022-06-29T06:43:55.611Z",
          "avatar_url": "http://localhost:4200/assets/images/no-image.png"
        },
        "category": {
          "_id": "62bbf4ab9510cc716a54955e",
          "category_name": "drama",
          "category_desc": "drama",
          "create_at": "2022-06-29T06:43:55.538Z",
          "update_at": "2022-06-29T06:43:55.538Z"
        }
      }]
  }
}
