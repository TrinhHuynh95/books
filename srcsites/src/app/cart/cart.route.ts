import { Routes } from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {AuthGuard} from "../shared/guards/auth.guard";

const routes: Routes = [
  {path: 'cart', component: ListComponent, canActivate: [AuthGuard]}
];

export default routes
