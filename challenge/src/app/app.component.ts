import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Map component';
  
  public lat: Number = -15.8614942;
  public lng: Number = -48.0313622;

  public origin: any;
  public destination: any;

  ngOnInit() {
    this.getDirection();
  }

  getDirection() {
    console.log('entra aqui')
    this.origin = { lat: -15.8614942, lng: -48.0313622 };
    this.destination = { lat: -15.8614948, lng: -48.0313630 };
    // this.origin = 'Brasilia';
    // this.destination = 'goiania';
  }
}
