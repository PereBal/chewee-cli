import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { SignInService } from './sing-in.service';
import { SignInUser } from './sign-in-user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [ './sign-in.component.css' ],
  providers: [ SignInService ]
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signInService: SignInService,
  ) {
    this.form = fb.group({
      userName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/[a-zA-Z0-9_+@.-]+/)
        ])
      ],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const user = new SignInUser(
      this.form.get('userName').value,
      this.form.get('password').value
    );
    this.signInService
      .signIn(user)
      .subscribe(
        next => {
          localStorage.setItem('authorization', next.object.serialize());
          const headers = next.response.headers;
          const location = headers.has('Location')
            ? [headers.get('Location')]
            : ['/', next.object.username];

          this.router.navigate(location);
        },
        err => {
          console.error(err);
        },
      );
    this.form.reset();
  }

  ngOnInit() {
  }

}
