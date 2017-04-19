import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './generic/page-not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: 'login',  component: SignInComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
