import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import authRoute from "./auth/auth.route";
import bookRoute from "./book/book.route";
import cardRoute from "./cart/cart.route";
import {ErrorComponent} from "./shared/components/error/error.component";

const routes: Routes = [
  ...authRoute,
  ...bookRoute,
  ...cardRoute,
  {path: 'error', component: ErrorComponent},
  { path: '', redirectTo: 'book', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
