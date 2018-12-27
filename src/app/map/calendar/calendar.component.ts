import { Component, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { ICoordinates } from 'src/app/interfaces/Coordinates';
import { MapService } from 'src/app/services/map.service';
import { Moment } from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnChanges {
  public date: Moment;
  public coordinates: ICoordinates[];
  public initialMarker: ICoordinates;
  public finalMarker: ICoordinates;
  public icons: { initial: Object; final: Object } = {
    initial: {
      url: './assets/images/green_pin.svg',
      scaledSize: {
        width: 30,
        height: 45
      }
    },
    final: {
      url: './assets/images/red_pin.svg',
      scaledSize: {
        width: 20,
        height: 35
      }
    }
  };

  constructor(private mapService: MapService) {}

  ngOnInit() {}

  ngOnChanges() {}

  dateChanged() {
    const date = this.date.format('YYYY-MM-DD');
    this.mapService.getCoordinatesByDate(date).then(res => {
      this.initialMarker = res[res.length - 1];
      this.finalMarker = res[0];
      this.coordinates = res;
    });
  }
}
