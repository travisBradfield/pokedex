import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPackComponent } from './components/search-pack/search-pack.component';

import { ComponentsModule } from "./components/components.module";
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsPageComponent,
    ListingPageComponent,
    // SearchPackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
