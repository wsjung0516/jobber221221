import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  name: string;
  isLoggedIn: boolean;
  public userProfile: KeycloakProfile | null = null;
  constructor(private keycloakService: KeycloakService, private router: Router) {
    console.log('AppComponent constructor');
  }
  async ngOnInit() {
    console.log('AppComponent ngOnInit');
    // this.refreshKeycloakToken();
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloakService.loadUserProfile();
      this.name = this.userProfile.firstName;
    }

  }
  refreshKeycloakToken() {
    this.keycloakService.keycloakEvents$.subscribe({
      next: (e) => {
        if (e.type == KeycloakEventType.OnTokenExpired) {
          this.keycloakService.updateToken(20);
        }
      }
    });  }
  login() {
    // this.oauthService.initCodeFlow();
    this.keycloakService.login();
  }
  logout() {
    this.keycloakService.logout();
  }
}
