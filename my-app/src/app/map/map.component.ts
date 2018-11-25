import { RequesitionService } from './../requesition.service';
import { AgmMap, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';


var key = "rota "; //base da chave do localStorage


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})



export class MapComponent implements OnInit {
  lat: number = -23.5672861; //localizações 
  lng: number = -46.7033562; //
  routes: Array<any> = []; //

  show = false;
  routeSelect: any;

  dir = {
    orig: { lat: null, lng: null },
    dest: { lat: null, lng: null }
  };


  @ViewChild(AgmMap) map: AgmMap;


  // importando os services e o agm-map
  constructor(private reqService: RequesitionService, public mapsApiLoader: MapsAPILoader, private zone: NgZone, private wrapper: GoogleMapsAPIWrapper) { }


  ngOnInit() {
    console.log(this.reqService.getData().subscribe(
      data => {
        const response = (data as any); // resposta

        for (var elem = 0; elem < response.length; elem++) {
          localStorage.setItem(key + (elem + 1), JSON.stringify(data[elem])); //busca cada rota na api e armazena como JSON no localStorage com um id da rota
          this.routes.push(data[elem].routeID); //esse array será usado para exibir uma lista com o número das rotas
        }
        console.log(data);
      }, error => {
        console.log('erro! tente novamente!: ' + error);
      }
    ));
  }


  selectedRoute(route: any) { //seleciona a rota clicada
    let item = JSON.parse(localStorage.getItem("rota " + route));
    this.dir.orig.lat = item.path[0].latitude; //origem
    this.dir.orig.lng = item.path[0].longitude;

    this.dir.dest.lat = item.path[1].latitude; //destino
    this.dir.dest.lng = item.path[1].longitude;


    //navegar entre as rotas...
    var x = document.getElementsByClassName('list-group-item');

    for (var e = 0; e < x.length; e++) {
      if (x[e].textContent == "Rota " + route) {
        this.show = true;
        x[e].classList.add('active');

        for (var i = 0; i < x.length; i++) {
          if (x[i].classList.contains('active') && x[i].textContent != 'Rota ' + route) {
            this.show = false;
            x[i].classList.remove('active');
          }
        }

      }
    }

  }
}
