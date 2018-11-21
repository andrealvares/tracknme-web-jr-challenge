import { ServiceService } from './service.service';
import { Component } from '@angular/core';
import _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tracknme-challenger';

  public origin: any;
  public destination: any;
  posicoes = [];

  public destinos = [];

  constructor(private service: ServiceService) {

  }

  ngOnInit() {
    this.getPoints();
  }

  getDirection() {
    let points = JSON.parse(localStorage.getItem("points"));
    this.origin = { lat: points[0].latitude, lng: points[1].longitude }
    this.destination = { lat: points[1].latitude, lng: points[1].longitude }
  }

  getPoints() {
    this.service.getPoints().subscribe(
      data => localStorage.setItem("points", JSON.stringify(data))
    );
  }

  getPosicoesByDate(data) {
    this.service.getPosicoes(data).subscribe(
      data => localStorage.setItem("posicoes", JSON.stringify(data))
    );
  }

  getPosicoes() {
    let posicoes = JSON.parse(localStorage.getItem("posicoes"));
    console.log(posicoes);
    for (let i = 0; i < posicoes.length; i++) {
      this.destinos.push({
        origem: { lat: posicoes[i][0].latitude, lng: posicoes[i][0].longitude },
        destino: { lat: posicoes[i][1].latitude, lng: posicoes[i][1].longitude }
      });
    }
    // this.destinos.push({
    //   origem:
    //   {
    //     "dateTime": "2017-10-03T21:34:15",
    //     lat: -4.972395,
    //     lng: -39.016436
    //   },
    //   destino: {
    //     "dateTime": "2017-10-03T21:40:15",
    //     lat: -3.736803,
    //     lng: -38.529155
    //   }
    // })
    console.log(this.destinos);
  }

  public renderOptions = {
    suppressMarkers: true,
  }

  public markerOptions = {
    origin: {
      icon: 'https://i.imgur.com/7teZKif.png',
      draggable: true,
    },
    destination: {
      icon: 'https://i.imgur.com/7teZKif.png',
      opacity: 0.8,
    },
  }
}
