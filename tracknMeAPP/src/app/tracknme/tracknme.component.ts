import { Component, OnInit } from '@angular/core';
import { Services } from '../shared/services/service.service';
import { CoordenadaModel } from '../shared/models/coordenada.model';
import { MessageAlertsService } from './../shared/services/messageAlertsService.service';
import { RotasModel } from '../shared/models/rotas.model';

const LIMIT_POSITION = 23;

@Component({
    selector: 'app-tracknme',
    templateUrl: './tracknme.component.html',
    styleUrls: ['./tracknme.component.css']
})

export class TrackNMeComponent implements OnInit {

    public coordenadas: CoordenadaModel [];
    public lat: any;
    public lng: any;
    public rotas: RotasModel [];
    
    constructor(
        private service : Services
    ) { 
        this.rotas = [];
        this.getCoordenadas();
    }

    async ngOnInit() {
       await this.getDirections();
    }

    ngAfterViewInit(): void {
    }

    async getCoordenadas() {
        this.coordenadas = await this.service.get('coordenadasRandom');

        localStorage.setItem("coordenadas", JSON.stringify(this.coordenadas));
    }

    getDirections(){    
        const coordenadas = JSON.parse(localStorage.getItem("coordenadas"));

        let caminho = { 
            origem: { lat: coordenadas[0].latitude, lng: coordenadas[0].longitude },            
            destino: { lat: coordenadas[1].latitude, lng: coordenadas[1].longitude },            
            waypoints: [],
            renderOptions: {            
                suppressMarkers: true
            },            
            markerOptions: {        
                origin: {        
                    icon: './../../assets/img/TracknME_Logo_Pequeno-1.png',        
                    infoWindow: this.setinfoWindow('Origem', coordenadas[0].dateTime, coordenadas[0].latitude, coordenadas[0].longitude) 
                },        
                waypoints: [],        
                destination: {        
                    icon: './../../assets/img/TracknME_Logo_Pequeno-1.png',        
                    infoWindow: this.setinfoWindow('Destino', coordenadas[1].dateTime, coordenadas[1].latitude, coordenadas[1].longitude)        
                }          
            },        
            show: true
        }

        this.rotas.push(caminho);
    }

    setinfoWindow(cabecalho, data, latitude, longitude) : string {
        var date = new Date(data).toLocaleString();

        return   '<h5>' + cabecalho + '<h5>'
                +"<h5>" + date + "<h5>" 
                + '<h5>' + 'Lat: ' + latitude  + '<h5>' 
                + '<h5>' + 'Lgn: ' + longitude + '<h5>';
    }

    public async OnSubmit(data){
        try {
            let result : any;
            let date = new Date(data);
            let dataCache = JSON.parse(localStorage.getItem(date.toUTCString()));
        
            if ((data !== "" && data !== undefined && data !== null)) {
                if (dataCache) {
                    result = dataCache;
                } else {
                    result = await this.service.get('posicoes/'+date.toUTCString());
                    localStorage.setItem(date.toUTCString(), JSON.stringify(result));
                }
            }

            this.buildRotas(result);

        } catch (error) {
            throw error;
        }

    }

    public buildRotas(result: any) {

        let waypointsLimit : boolean = true;
        let countLimit: number = 0;

        var caminho : RotasModel;
        
        if (result != undefined) {
            this.rotas = [];
            this.lat = -23.5489;
            this.lng = -46.6388;
            caminho = new RotasModel();

            if (result.length !== 0) {
                if (result.length === 1) {
                    caminho.origem.lat  = result[0].latitude;
                    caminho.origem.lng  = result[0].longitude;
                    caminho.destino.lat = result[0].latitude;
                    caminho.destino.lng = result[0].longitude; 
                    caminho.waypoints = [];
                }  else {
                    for (let index = 0; index < result.length-1; index++) {
                        const element = result[index];
    
                        if (countLimit === 0) {
                            caminho.origem.lat =  element.latitude;
                            caminho.origem.lng =  element.longitude;
                            caminho.markerOptions.origin.infoWindow = this.setinfoWindow('Origem', element.dateTime, element.latitude, element.longitude); 
                        } else if ((countLimit === LIMIT_POSITION-1) || (index === result.length-1)) {
                            caminho.destino.lat = element.latitude;
                            caminho.destino.lng = element.longitude;
                            caminho.markerOptions.destination.infoWindow = this.setinfoWindow('Destino', element.dateTime, element.latitude, element.longitude); 
                            waypointsLimit = false;
                        } else {
                            let resultElement = {
                                location: { lat: element.latitude, lng: element.longitude },
                                stopover: false,
                            }

                            let markerOptionsResultElement = {
                                icon: './../../assets/img/TracknME_Logo_Pequeno-1.png',        
                                infoWindow: this.setinfoWindow('WayPoint ' + index, element.dateTime, element.latitude, element.longitude)
                            }

                            caminho.markerOptions.waypoints.push(markerOptionsResultElement);
                            caminho.waypoints.push(resultElement);
                        }

                        countLimit = countLimit + 1;   

                        if (!waypointsLimit) {
                            this.rotas.push(caminho);
                            countLimit = 0;
                            waypointsLimit = true;
                            caminho = new RotasModel();
                        }
                    }
                }
            }
            
        } else {
            MessageAlertsService.warningMessage("Data Inválida", "É necessário uma data válida na consulta.");
        }
    }
}