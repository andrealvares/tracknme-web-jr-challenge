import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MapService } from '../../services/map.service';
import { ICoordinates } from '../../interfaces/Coordinates';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  public marker: ICoordinates;
  public coordinates: ICoordinates[];
  public icon: Object;
  private icons: { initial: Object; final: Object } = {
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
        width: 30,
        height: 45
      }
    }
  };

  constructor(private mapService: MapService) {
    this.coordinates = [];
    this.icon = this.icons.initial;
  }

  ngOnInit() {
    this.mapService.getAllCoordinates().then(res => {
      this.animationHandler(res);
    });
  }

  animationHandler(res: ICoordinates[]) {
    const total = res.length;
    const interval = setInterval(() => {
      if (this.coordinates.length === total) {
        this.icon = this.icons.final;
        return clearInterval(interval);
      }
      this.marker = res[res.length - 1];
      this.coordinates.push(this.marker);
      res.pop();
    }, 250);
  }
}
