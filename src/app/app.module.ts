import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
