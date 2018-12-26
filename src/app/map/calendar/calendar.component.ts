import { Component, OnInit } from '@angular/core';
import { ICoordinates } from 'src/app/interfaces/Coordinates';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  constructor(private mapService: MapService) {}

  ngOnInit() {}
}
