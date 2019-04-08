import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cacheable } from 'ngx-cacheable';
import { ModelStart } from './models/ModelStart';
import { ModelDirection } from './models/ModelDirection';



@Injectable()
export class DataService {

    private dataString: any;
    private dataUS: any;
    private readonly API = environment.API;
    private readonly START = 'start';
    private readonly DIRECTION = '/direction';

    constructor(private http: HttpClient) { }

    @Cacheable()
    getDirections(data) {

        if (data != null && data !== '') {
            this.dataString = data.split('/');
            this.dataUS = new Date(this.dataString[2], this.dataString[1] - 1, this.dataString[0]);
            this.dataUS = this.dataUS.toISOString().replace('Z', '');
        } else {
            this.dataUS = null;
        }

        return this.http.get<Array<ModelDirection>>(this.API + this.DIRECTION + '?data=' + this.dataUS).pipe(
            map(reponse => reponse)
        );

    }

    getStart() {
        return this.http.get<ModelStart>(this.API + this.START).pipe(
            map(reponse => reponse)
        );
    }
}
