import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemtemListingComponent } from './components/temtem-listing/temtem-listing.component';
import { TemtemListingItemComponent } from './components/temtem-listing-item/temtem-listing-item.component';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TemtemProfileComponent } from './components/temtem-profile/temtem-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TemtemListingComponent,
    TemtemListingItemComponent,
    TemtemProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
