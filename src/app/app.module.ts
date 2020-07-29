import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemtemListingComponent } from './components/temtem-listing/temtem-listing.component';
import { TemtemListingItemComponent } from './components/temtem-listing-item/temtem-listing-item.component';
import { HttpClientModule } from '@angular/common/http';
import { TemtemOptionsComponent } from './components/temtem-options/temtem-options.component';

@NgModule({
  declarations: [
    AppComponent,
    TemtemListingComponent,
    TemtemListingItemComponent,
    TemtemOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
