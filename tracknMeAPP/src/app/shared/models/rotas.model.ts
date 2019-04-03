export class RotasModel {
    origem: any;
    destino: any;
    waypoints: any [];
    renderOptions: {
        suppressMarkers: Boolean
    };
    markerOptions: {
        origin: {
            icon: string,
            infoWindow: string
        },
        waypoints: any [],
        destination: {
            icon: string,
            infoWindow: string
        }
    };
    show: Boolean

    constructor() {
        this.origem  = { lat: null, lng: null},            
        this.destino =  { lat: null, lng: null},            
        this.waypoints=  [];
        this.renderOptions ={
            suppressMarkers: true      
        };      
        this.markerOptions = {        
                origin: {        
                    icon: './../../assets/img/TracknME_Logo_Pequeno-1.png',        
                    infoWindow: '' 
                },        
                waypoints: [],        
                destination: {        
                    icon: './../../assets/img/TracknME_Logo_Pequeno-1.png',        
                    infoWindow: ''        
                }          
        };
        this.show = true;

    }
}

