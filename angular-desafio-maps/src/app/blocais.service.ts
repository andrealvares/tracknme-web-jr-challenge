import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlocaisService {
  locaisUrl='http://private-68ec8a-coordapi.apiary-mock.com/questions';
  date:any;
  constructor(private http: HttpClient) { }
locaisUrlD='';

  listar(){
    
    return this.http.get<any>(`${this.locaisUrl}`);
  }
   
  
  listarS(){this.locaisUrlD='http://127.0.0.1:3333/coords?date='+this.date;
      return this.http.get<any>(`${this.locaisUrlD}`);
    
  }

/*dentro da api construída com adonis no nodejs
tenho os seguintes dados:

    {
        "id": 1,
        "latitude": -23.962676666666667,
        "longitude": -46.4084785,
        "dateTime": "2017-10-20"
    },
    {
        "id": 2,
        "latitude": -23.962676666666667,
        "longitude": -46.3884785,
        "dateTime": "2017-10-12"
    },
    {
        "id": 3,
        "latitude": -22.962676666666667,
        "longitude": -49.3884785,
        "dateTime": "2018-11-12"
    },
    {
        "id": 4,
        "latitude": -23.962675445544,
        "longitude": -46.4086785,
        "dateTime": "2017-10-20"
    },
    {
        "id": 5,
        "latitude": -23.9626754466743,
        "longitude": -46.4082121,
        "dateTime": "2017-10-20"
    }

já na apiary

       {
             "dateTime":"2017-08-20",
             "latitude":"-23.96666445544",
             "longitude":"-46.9821923"
            },
            {
            "dateTime":"2017-08-23",
            "latitude":"-23.82828223143",
            "longitude":"-46.1221113"
            },
              "dateTime":"2017-08-23",
            "latitude":"-23.828282221211",
            "longitude":"-46.122202232"
            }

*/

}
