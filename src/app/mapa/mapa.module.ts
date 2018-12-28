import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { MapaRoutingModule } from './mapa-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CalendarioComponent,
    MapaComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAeJcZ7hF9f2nWRb75cvurZybiTDSBawLw'
    }),
    MapaRoutingModule,
    SharedModule
  ]
})
export class MapaModule { }
