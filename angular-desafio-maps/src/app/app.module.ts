import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgmDirectionModule } from 'agm-direction' 
import { AppComponent } from './app.component';
import { LocalmapaComponent } from './localmapa/localmapa.component';
import { BlocaisService } from './blocais.service';
import { AgmCoreModule } from '@agm/core';
import { Marker } from './marker';  
@NgModule({
  declarations: [
    AppComponent,
    LocalmapaComponent
  ],
  imports: [AgmCoreModule.forRoot({
    apiKey: 'AIzaSyDBctvt_SrXU7wenblj-j4guMiBD6TsPJM'
  }), FormsModule,
    BrowserModule, AgmDirectionModule,
    HttpClientModule
  ],
  providers: [BlocaisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
