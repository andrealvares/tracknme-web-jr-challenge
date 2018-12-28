import { Component } from '@angular/core';

import { MapApiService } from './core/services/map-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Track\'nMe';
  activeLink = 'mapa';

  constructor(
      private mapApiService: MapApiService
  ) {
    mapApiService.init();
  }
}
