import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../../../shared/rules";
import {AuthService} from "../../../shared/services/auth.service";
import {Router} from "@angular/router";
import msg from "../../../shared/helpers/msg";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    pw: new FormControl('', [
      Validators.required,
      passwordValidator()
    ]),
  });

  error: string[] = []

  constructor(private auth: AuthService, private router: Router) {
  }

  submit() {
    this.error = [];
    if (this.form.valid) {
      const subscribe = this.auth.register(this.form.value)
        .subscribe(res => {
          if (res.error) {
            this.error.push(res.error)
          } else {
            this.router.navigateByUrl('/');
          }
          subscribe.unsubscribe()
        })
    } else {
      for (const k in this.form.get('email')?.errors) {
        this.error.push(msg('Email')(['validate', k], ''))
      }
      for (const k in this.form.get('pw')?.errors) {
        this.error.push(msg('Password')(['validate', k],  ''))
      }
    }
  }
}
