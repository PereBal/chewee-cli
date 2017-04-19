import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions,
         URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Authorization } from '../models/authorization';
import { ProcessedResponse } from '../models/processed-response';
import { SignInUser } from './sign-in-user.model';

@Injectable()
export class SignInService {
  private lang = 'en-US';
  private base = 'http://127.0.0.1:3000';
  private authPath = 'auth';

  // Add version and lang ? (via heritage or something??)
  private endpoint = `${this.base}/${this.authPath}/sign-in?lang=${this.lang}`;
  private headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  constructor (private http: Http) { }

  signIn(user: SignInUser): Observable<ProcessedResponse> {
    const data = new URLSearchParams();
    data.append('username', user.userName);
    data.append('password', user.password);
    return this.http
      .post(
        this.endpoint,
        data,
        new RequestOptions({headers: this.headers})
      )
      .map(asProcessedResponse)
      .catch((error: Response) => Observable.throw(error || 'Unkown error'));

      function asProcessedResponse(res: Response) {
        const jsonRes = res.json();
        return new ProcessedResponse(
          res,
          new Authorization(
            jsonRes.access_token,
            jsonRes.token_type,
            jsonRes.expires_in,
            jsonRes.refresh_token,
            jsonRes.scope,
            jsonRes.username,
          )
        );
      }
  }
}
