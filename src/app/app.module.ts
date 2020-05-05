import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BotService } from './core/shared/services/bot/bot.service';
import { ApiService } from './core/shared/services/api/api.service';
import { BlockComponent } from './admin/block/block.component';
import { DataComponent } from './admin/data/data.component';
import { appRoutingModule } from './app.routing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fakeBackendProvider } from './core/helpers';
import { BasicAuthInterceptor, ErrorInterceptor } from './core/helpers';
import { InitComponent } from './public/init';
import { LoginComponent } from './public/login';
import { ChatComponent } from './public/chat/chat.component';
import { UserComponent } from './admin/user/user.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    appRoutingModule,
    HttpClientModule,
    FontAwesomeModule,

  ],
  declarations: [
    AppComponent,
    BlockComponent,
    DataComponent,
    InitComponent,
    LoginComponent,
    ChatComponent,
    UserComponent

  ],
  providers: [
    BotService,
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
