import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { BotStatusComponent } from './bot-status/bot-status/bot-status.component';
import { BotService } from './_services';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    FontAwesomeModule

  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    BotStatusComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    BotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
