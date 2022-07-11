import {AuthorModel} from "./author.model";
import {CategoryModel} from "./category.model";

export class BookModel {
  "_id": string;
  "category_id": string;
  "author_id": string;
  "book_title": string;
  "book_summary": string;
  "book_price": number;
  "quantity": number;
  "book_cover_photo_url": string;
  "create_at": string | Date;
  "update_at": string | Date;
  "author": AuthorModel;
  "category": CategoryModel;
  "cart": number = 0;
}
