import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './shared/angular-material.module';
import { UserModule } from './user/user.module';
import { JOBBER_ISSUER, JOBBER_REALM, JOBBER_CLIENT } from './environments/keycloak-parameter';
import { environment } from './environments/environment';
function initializeKeycloak(keycloak: KeycloakService) {
  console.log('environment.keycloak.url',environment.keycloak.url, JOBBER_ISSUER, JOBBER_REALM, JOBBER_CLIENT)
  return () =>
    keycloak.init({
      config: {
        realm: JOBBER_REALM,
        url: JOBBER_ISSUER,
        clientId: JOBBER_CLIENT
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    KeycloakAngularModule,
    AngularMaterialModule,
    UserModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
