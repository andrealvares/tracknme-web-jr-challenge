import { Component } from '@angular/core';
import { RequestService } from './request.service';
import { promise } from 'protractor';
import { stringify } from '@angular/core/src/util';

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

  setLocalStorage(positions) {
    const data = this.convertDate(new Date(positions[0].dateTime));
    localStorage.setItem(`position${data}`, JSON.stringify([{
      lat: positions[0].latitude,
      lng: positions[0].longitude,
      dateTime: positions[0].dateTime
    },{
      lat: positions[1].latitude,
      lng: positions[1].longitude,
      dateTime: positions[1].dateTime
    }]));
  }

  getLocalStorage(date) {
    const positionStorage = JSON.parse(localStorage.getItem(`position${date}`));
    const latOrigin = parseFloat(positionStorage[0].lat);
    const lngOrigin = parseFloat(positionStorage[0].lng);
    const latDest = parseFloat(positionStorage[1].lat);
    const lngDest = parseFloat(positionStorage[1].lng);
    this.origin = {lat: latOrigin, lng: lngOrigin};
    this.destination = {lat: latDest, lng: lngDest};
  }

  getPosition(date){
    this.requestService.getPositions(date)
      .subscribe((positions: any) => {
        this.setLocalStorage(positions);
        this.getLocalStorage(date);
      });
  }

  convertDate(date) {
    const day: String = date.getDate().toString().length > 1 ? date.getDate().toString() : `0${date.getDate().toString()}`;
    const month: String = date.getMonth().toString().length > 1 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1).toString();
    const year: String = date.getFullYear().toString();
    const newDate: String = `${year}-${month}-${day}`;
    return newDate;
  }

  changeDate(e) {
    const date = this.convertDate(e.value);
    if(localStorage.getItem(`position${date}`)) {
      this.getLocalStorage(date);
    }else{
      this.getPosition(date);
    }
  }

  ngOnInit() {
    this.getPosition(new Date());
  }

  getDirection() {
    this.origin = this.origin;
    this.destination = this.destination;
  }
}
