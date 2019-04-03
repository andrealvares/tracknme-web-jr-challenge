import { Routes, RouterModule } from '@angular/router';
import { TrackNMeComponent } from './tracknme.component';


const TRACKNME_ROUTES: Routes = [
  {
    path: '', component: TrackNMeComponent
  }
];

export const TrackNMeRouting = RouterModule.forChild(TRACKNME_ROUTES);
