import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction-max';
import { DataService } from './dataService/dataService';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCr_aRw3Vvo6Egxtjfbu74StgDB6eOA0ls'
    }),
    AgmDirectionModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
