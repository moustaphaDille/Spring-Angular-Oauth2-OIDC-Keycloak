import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import {
  provideKeycloak,
  includeBearerTokenInterceptor,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, HasRolesDirective
} from 'keycloak-angular';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Products } from './ui/products/products';
import { Customers } from './ui/customers/customers';

@NgModule({
  declarations: [App, Products, Customers],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HasRolesDirective
  ],
  providers: [
    provideKeycloak({
      config: {
        url: 'http://localhost:8080',
        realm: 'bdcc-realm',
        clientId: 'ecom-client-ang'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html'
      }
    }),

    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        {
          urlPattern: /^http:\/\/localhost:8087\/api\/.*$/i
        }
      ]
    },

    provideHttpClient(
      withInterceptors([includeBearerTokenInterceptor])
    )
  ],
  bootstrap: [App]
})
export class AppModule {}

// import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing-module';
// import { App } from './app';
// import { Products } from './ui/products/products';
// import { Customers } from './ui/customers/customers';
// import {HttpClient, HttpClientModule} from '@angular/common/http';
//
// @NgModule({
//   declarations: [
//     App,
//     Products,
//     Customers
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule
//   ],
//   providers: [
//     provideBrowserGlobalErrorListeners(),
//   ],
//   bootstrap: [App]
// })
// export class AppModule { }
