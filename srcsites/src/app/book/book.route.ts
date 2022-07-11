import { Routes } from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {DetailComponent} from "./components/detail/detail.component";
import {AddComponent} from "./components/add/add.component";
import {AdminGuard} from "../shared/guards/admin.guard";

const routes: Routes = [
  { path: 'book', component: ListComponent},
  { path: 'book/add', component: AddComponent, canActivate: [AdminGuard]},
  { path: 'book/:_id', component: DetailComponent},
];
export default routes
