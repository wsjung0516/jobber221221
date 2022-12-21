import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/keycloak/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent), canActivate: [AuthGuard] },
  { path: 'user', loadComponent: () => import('./user/user.component').then((c) => c.UserComponent) },
  { path: "", redirectTo: "about", pathMatch: "full"},
  { path: "**", redirectTo: "about",pathMatch: "full"}
  // { path: 'heroes/:id', loadComponent: () => import('./hero/hero-detail.component').then((c) => c.HeroDetailComponent) }
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
