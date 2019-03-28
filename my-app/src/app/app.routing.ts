import { CalendarComponent } from './calendar/calendar.component';
import { MapComponent } from './map/map.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES: Routes = [
    {path: '', component: MapComponent}, //rotas que serão usadas 
    {path: 'calendario', component: CalendarComponent}, //
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
