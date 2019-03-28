import { MapComponent } from './../map/map.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { isSameDay } from 'date-fns';
import { RequesitionService } from '../requesition.service';
import { AgmMap, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';

var item = 1;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  lat: number = -23.5672861; //localizações 
  lng: number = -46.7033562; //
  public routesDay: Array<object> = []; //array de objetos
  show = false;


  dir = { //objetos
    orig: { lat: null, lng: null},
    dest: { lat: null, lng: null}
  };
  date: number;

  @ViewChild(AgmMap) map: AgmMap;

  constructor() { }

  ngOnInit() { }

  consultRoutes(date: any){
    //console.log(date);
    let r, datas: Array<any>;
    let i: number = 0;
    for(var e = 0 ;e<localStorage.length;e++){
      if(r = JSON.parse(localStorage.getItem("rota "+(e+1)))){ //vai consultar todas as rotas do localstorage 
        if((r.path[0].dateTime.split('T')[0])==date){ //2017-10-12T21:34:15 vai separar a data da hora

          this.dir.orig.lat = r.path[0].latitude; //armazena nos objetos relativos
          this.dir.orig.lng = r.path[0].longitude;
          this.dir.dest.lat = r.path[1].latitude;
          this.dir.dest.lng = r.path[1].longitude;
          this.routesDay.push(this.dir); //armazena no array que vai receber os objetos
          this.show = true;
          
        }

      }

    }
    
    console.log(this.routesDay);
  }

  onSubmit(f:any){ //recebe submit do calendário
   let haveItem = false;

    if(localStorage.length == 0){ //verifica se é o primeiro submit
      localStorage.setItem("data "+item, f.value.date);
      item++;
      this.consultRoutes(f.value.date);
    }
    //senão...
    else{
      for(var e = 0; e<localStorage.length;e++){ 
        let x = localStorage.getItem("data "+(e+1)) == f.value.date;
        if(x){
          haveItem = true; //verfica se tem esse item 
          this.consultRoutes(f.value.date); //faz a consulta das rotas associadas a data 
        } 
      }
      //se não tem o item armazena no localStorage
      if(!haveItem){
        localStorage.setItem("data "+(item),f.value.date);
        item++;
        this.consultRoutes(f.value.date); // e... consulta as rotas
      }
    }
  }

}
