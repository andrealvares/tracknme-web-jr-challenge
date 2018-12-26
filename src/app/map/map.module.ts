import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map.component';
import { RouterModule, Routes } from '@angular/router';
import { MapService } from '../services/map.service';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [MapComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBDAx01EDZ1OSP8qzpLVJNEbkX6bFEkJfs' })
  ],
  providers: [MapService]
})
export class MapModule {}
