import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import {UnAuthGuard} from "../shared/guards/un-auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UnAuthGuard] },
];
export default routes
