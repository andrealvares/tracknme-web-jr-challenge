import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequesitionService {
  baseApi = "http://private-b20c6c-silascastro.apiary-mock.com/"; //endereço base da api
  constructor(private http: HttpClient) {}

   getData(){
     return this.http.get(this.baseApi+"routes"); //endereço FULL
   }
}
