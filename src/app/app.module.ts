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
import { InitComponent } from './public/init/init.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    DataComponent,
    InitComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    appRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    
  ],
  providers: [
    BotService, 
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
