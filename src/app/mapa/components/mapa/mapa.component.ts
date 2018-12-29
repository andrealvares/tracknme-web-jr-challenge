import { Component, OnInit } from '@angular/core';

import { MapApiService } from '../../../core/services/map-api.service';
import { Position } from '../../../core/interfaces/Position';
import * as moment from 'moment';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  positions: Position[] = [];
  icons = ['../../../assets/images/maps-and-flags-start.png', '../../../assets/images/maps-and-flags-end.png'];
  animation: any;

  constructor(
      private mapApiService: MapApiService
  ) { }

  ngOnInit() {
    this.mapApiService.getRoutes().then(res => {
      this.positions = res;
    });
  }

  formatHour(dateTime) {
    return moment(dateTime).startOf('day').fromNow();
  }

  mapReady() {
    this.animation = 'DROP';
  }
}