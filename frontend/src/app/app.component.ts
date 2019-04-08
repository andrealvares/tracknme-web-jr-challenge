import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './dataService/dataService';
import { take, map } from 'rxjs/operators';
import { constant } from './dataService/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  renderOptions = constant.renderOptions;
  origin = constant.origin;
  destination = constant.destination;
  markerOptions = constant.markerOptions;

  dataService: DataService;
  search: any;
  directions = { };
  filtro = '';
  zoom = 15;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  ngOnInit() {

    this.dataService.getStart().pipe(take(1)).subscribe(data => {

        this.origin.lat = data.origin.lat;
        this.origin.lng = data.origin.lng;

        this.destination.lat = data.destination.lat;
        this.destination.lng = data.destination.lng;

    });

    this.filtroData(null);

  }

  ngOnDestroy() {

  }

  filtroData(filtro) {

    this.search = localStorage.getItem(filtro);
    if (this.search && this.search !== 'undefined') {
        this.directions = JSON.parse(this.search);
        return;
    }

    this.dataService.getDirections(filtro).pipe(take(1)).subscribe(response => {
        response.map(dados => {
            dados.data = new Date(dados.dateTime).toLocaleDateString();
            dados.hora = new Date(dados.dateTime).toLocaleTimeString();
        });

        this.directions = response;
        if (!localStorage.getItem(filtro)) {
            if (filtro != null) {
                localStorage.setItem(filtro, JSON.stringify(response));
            }
        }
    });

  }

  setMap(dados) {

    this.origin.lat = dados.latitude;
    this.origin.lng = dados.longitude;
    this.destination = { lat: -23.9826767, lng: -46.4084785 };

  }

  clenFiltro() {

    this.filtroData(null);
    this.filtro = '';

  }

}
