import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/keycloak/auth.guard';
import { HomeComponent } from './home/home.component';
// import { AuthGuard } from '@app/core/keycloak/auth.guard';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent), canActivate: [AuthGuard] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},

  // { path: 'user', loadComponent: () => import('./user/user.component').then((c) => c.UserComponent) },
  { path: "", redirectTo: "about", pathMatch: "full"},
  { path: "**", redirectTo: "about",pathMatch: "full"}
  // { path: 'heroes/:id', loadComponent: () => import('./hero/hero-detail.component').then((c) => c.HeroDetailComponent) }

];

@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,

  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
