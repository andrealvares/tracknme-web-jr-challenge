import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

import { MapApiService } from '../../../core/services/map-api.service';
import { Position } from '../../../core/interfaces/Position';
import * as moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarioComponent implements OnInit {

  positions: Position[] = [];
  markers: Position[] = [];

  date = new FormControl('');

  openWith = [];

  status: { isLoading: boolean, error: string } = {isLoading: false, error: ''};

  mapConfigDefault = {latitude: -15.799247, longitude: -47.860967, zoom: 3};
  mapConfig: { latitude: number, longitude: number, zoom: number } =  Object.assign({}, this.mapConfigDefault); // para iniciar centralizado no brasil

  showAllMarkers: boolean = false;

  icons = {
    start: '../../../assets/images/maps-and-flags-start.png',
    end: '../../../assets/images/maps-and-flags-end.png',
    pointer: '../../../assets/images/pointer-pin.png',
    pin: '../../../assets/images/pin.png',
  };

  constructor(
      private mapApiService: MapApiService,
      private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.date.valueChanges.subscribe((dateTime: Date) => {
      this.getPositions(dateTime);
    });
  }

  getPositions(dateTime = new Date()) {

    this.status.isLoading = true;
    this.status.error = '';
    this.positions = [];
    this.markers = [];
    this.mapApiService.getHistory(dateTime).then(res => {

      this.positions = res;
      this.configMarker(false);
      this.positionFocus();
      this.status.isLoading  = false;
      this.changeDetectorRef.detectChanges();

    }, ( ) => {
      this.status.isLoading = false;
      this.status.error = 'Não encontramos seu histórico para este dia.';
      this.positionFocus();
      this.changeDetectorRef.detectChanges();

    });

  }

  configMarker(allMarkers) {
    this.showAllMarkers = allMarkers;

    this.markers = [];

    const markers: Position[] = [];

    if (allMarkers) {
      this.positions.forEach((position, index) => {
        position.icon = index !== 0 && index !== this.positions.length - 1 ? this.icons.pointer : index === 0 ?  this.icons.start :  this.icons.end;
        markers.push(position);
      });

    } else {
      const markerStart = this.positions[0];
      markerStart.icon = this.icons.start;
      markers.push(markerStart);

      const markerEnd = this.positions[this.positions.length - 1];
      markerEnd.icon = this.icons.end;
      markers.push(markerEnd);

    }

    this.markers = markers;
  }

  onMouseOpen(marker, event) {
    if (marker.icon === this.icons.start || marker.icon === this.icons.end) {
      return;
    }

    this.openWith[marker.dateTime] = this.openWith[marker.dateTime] || [];

    if (event === 'click') {
      this.openWith[marker.dateTime] = event;

    } else if (this.openWith[marker.dateTime] !== 'click') {
      this.openWith[marker.dateTime] = event;

    }

    marker.icon = this.icons.pin;
  }

  onMouseClose(marker, event) {
    if (marker.icon === this.icons.pin && (event === 'click' || (event === 'hover' && this.openWith[marker.dateTime] === 'hover'))) {
      this.openWith[marker.dateTime] = null;
      marker.icon = this.icons.pointer;
    }
  }

  private formatHour(dateTime) {
    return `${moment(dateTime).format('L')} ás ${moment(dateTime).format('LT')}`;
  }

  positionFocus() {
    const middlePosition: any = this.positions[this.positions.length - 1] || this.mapConfigDefault;

    this.mapConfig.latitude = middlePosition.latitude;
    this.mapConfig.longitude = middlePosition.longitude;

    if (middlePosition.zoom) {
      this.mapConfig.zoom = middlePosition.zoom;

    } else {
      const interval = setInterval(() => {
        this.mapConfig.zoom += 0.2;
        this.changeDetectorRef.detectChanges();

        if (this.mapConfig.zoom >= 13) {
          clearInterval(interval);
        }
      }, 25);

    }
  }

  getInfoMarkerText(dateTime: string, index: number) {
    const dateFromated = this.formatHour(dateTime);

    let text = 'Você esteve aqui em ';
    if (index === 0) {
      text = 'Você saiu daqui em ';
    } else if (index === this.markers.length - 1) {
      text = 'Você chegou aqui em ';

    }

    return `${text}${dateFromated}.`;
  }
}
