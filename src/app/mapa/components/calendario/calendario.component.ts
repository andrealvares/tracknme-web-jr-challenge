import { Component, OnInit } from '@angular/core';
import { Position } from '../../../core/interfaces/Position';
import { MapApiService } from '../../../core/services/map-api.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  routes: Position[] = [];
  animation: any;
  date = new FormControl((new Date()).toISOString());

  constructor(
      private mapApiService: MapApiService,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.mapApiService.getRoutes().then(res => {
      this.routes = res;
    });
  }

  mapReady() {
    this.animation = 'DROP';
  }

}
