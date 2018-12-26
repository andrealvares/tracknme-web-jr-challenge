import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICoordinates } from '../interfaces/Coordinates';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private apiURl = 'https://private-b4bbfe-tracknmechallenge1.apiary-mock.com/';

  constructor(private http: HttpClient) {}

  public getAllCoordinates(): Promise<ICoordinates[]> {
    const promise: Promise<ICoordinates[]> = new Promise((resolve, reject) => {
      let coordinates: ICoordinates[] = JSON.parse(localStorage.getItem('coordinates'));

      if (coordinates) {
        resolve(coordinates);
      } else {
        this.http
          .get<Coordinates[]>(`${this.apiURl}/coordinates/`)
          .toPromise()
          .then(
            (res: Coordinates[]) => {
              localStorage.setItem('coordinates', JSON.stringify(res));
              coordinates = JSON.parse(localStorage.getItem('coordinates'));
              resolve(coordinates);
            },
            msg => reject(msg)
          );
      }
    });
    return promise;
  }
}
