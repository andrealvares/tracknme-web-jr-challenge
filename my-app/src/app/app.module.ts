import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NgModule } from '@angular/core';
import {AgmDirectionModule} from 'agm-direction';
import { AppRoutingModule } from './app-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDFTKbcSXEN22pUx3zfaabEOGyy7oOZtmI'}), //essa api key é limitada à poucas requisições
    NgbModule.forRoot(),
    AgmDirectionModule,
    HttpClientModule, //modulo http para fazer a conexão com a api REst
    FormsModule, //modulo de forms que será usado
    AppRoutingModule,
    routing
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
