import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getPositions(date) {
    return this.http.get('http://private-009a1c-camilofernandes.apiary-mock.com/posicoes?datetime=' + date);
  }
}
