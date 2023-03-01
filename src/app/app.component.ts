import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  name: string;
  isLoggedIn: boolean;
  public userProfile: KeycloakProfile | null = null;
  constructor(private keycloakService: KeycloakService, private userService: UserService) {
    console.log('AppComponent constructor');
  }
  async ngOnInit() {
    console.log('AppComponent ngOnInit');
    this.refreshKeycloakToken();
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloakService.loadUserProfile();
      console.log('userProfile', this.userProfile);
      this.name = this.userProfile.firstName;
      if( this.userProfile.id ) {
        this.userService.saveUserProfileToDB(this.userProfile);
      }
    }
    // keycloakEvents$ is an observable that emits KeycloakEvents
    this.keycloakService.keycloakEvents$.subscribe((event)=>{
      console.log('keycloakEvents$',event);
    });

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
  // how to get the event from keycloak when the user registers
}
