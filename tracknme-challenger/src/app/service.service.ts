import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceService {

  constructor(private http: HttpClient) { }

  getPoints(): Observable<any> {
    return this.http.get('http://localhost:7000/points');
  }

  getPosicoes(data): Observable<any> {
    return this.http.get('http://localhost:7000/posicoes/' + data);
  }
}
