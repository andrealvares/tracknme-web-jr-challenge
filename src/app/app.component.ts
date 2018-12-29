import { Component } from '@angular/core';

import { MapApiService } from './core/services/map-api.service';
import { NavigationEnd, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Track\'nMe';
  activeLink = '';

  constructor(
      private mapApiService: MapApiService,
      public router: Router
  ) {
    mapApiService.init();

    moment.locale('pt');

    router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url;
      }
    });
  }
}
