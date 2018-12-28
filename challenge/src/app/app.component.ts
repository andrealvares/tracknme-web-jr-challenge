import { Component } from '@angular/core';
import { RequestService } from './request.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Map component';
  
  public lat: Number = -15.8614942;
  public lng: Number = -48.0313622;

  public origin: any = { lat: -15.8614942, lng: -48.0313622 };
  public destination: any = { lat: -15.8614942, lng: -48.0313622 };

  constructor(
    private requestService:RequestService
  ) {}

  setLocalStorage(positions, positionLen) {
    return new Promise((resolve) => {
      positions.map((position, i) => {
        localStorage.setItem(`position${i}Lat`, position.latitude);
        localStorage.setItem(`position${i}Lng`, position.longitude);
        if(i === (positionLen - 1)) {
          resolve();
        }
      });
    });
  }

  getLocalStorage(positions) {
    let origin = true;
    positions.map((position, i) => {
      const lat = parseFloat(localStorage.getItem(`position${i}Lat`));
      const lng = parseFloat(localStorage.getItem(`position${i}Lng`));
      const positionTarget = {lat, lng};
      if(origin) this.origin = positionTarget;
      if(!origin) this.destination = positionTarget;
      origin = false;
    });
  }

  ngOnInit() {
    this.requestService.getPositions()
      .subscribe((positions: any) => {
        const positionLen: Number = positions.length;
        this.setLocalStorage(positions, positionLen)
          .then(() => {
            this.getLocalStorage(positions);
          });
      });
  }

  getDirection() {
    this.origin = this.origin;
    this.destination = this.destination;
  }
}
