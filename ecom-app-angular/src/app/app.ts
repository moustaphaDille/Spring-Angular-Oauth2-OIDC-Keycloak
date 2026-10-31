import {Component, signal, inject, OnInit} from '@angular/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('ecom-app-angular');

  username?: string;

  async ngOnInit() {
    if (this.keycloak.authenticated) {
      const profile = await this.keycloak.loadUserProfile();
      this.username = profile.username;
    }
  }

  private keycloak = inject(Keycloak);

  async handleLogin() {
    await this.keycloak.login({
      redirectUri: window.location.origin
    });
  }

  async handleLogout() {
    await this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }
}


// import { Component, signal } from '@angular/core';
// import {KeycloakService} from 'keycloak-angular';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.html',
//   standalone: false,
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('ecom-app-angular');
// //   constructor(public keycloakService : KeycloakService) {
// //   }
// //
// //  async handleLogin(){
// //     await this.keycloakService.login({
// //       redirectUri: window.location.origin
// //     })
// //
// //   }
// //   handleLogout(){
// //    this.keycloakService.logout(window.location.origin);
// //
// //   }
//  }
