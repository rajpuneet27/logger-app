import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggerComponent } from './logger/logger.component';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoggerComponent,
    FilterPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
