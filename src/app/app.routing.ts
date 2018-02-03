import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './view/users/login/login.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
];
//
// @NgModule({
//   imports: [ RouterModule.forRoot(appRoutes)],
//   exports: [ RouterModule ]
// })

export const routing = RouterModule.forRoot(appRoutes);
// export class AppRoutingModule {}
