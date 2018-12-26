import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MatFormFieldModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MapComponent } from './map/map.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { MapService } from '../services/map.service';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [MapComponent, CalendarComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBDAx01EDZ1OSP8qzpLVJNEbkX6bFEkJfs' })
  ],
  providers: [MapService, MatMomentDateModule]
})
export class MapModule {}
