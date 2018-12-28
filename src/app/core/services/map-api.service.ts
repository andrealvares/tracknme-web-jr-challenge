import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Position } from '../interfaces/Position';
import { StorageKeys } from '../../storage-keys';

@Injectable({
    providedIn: 'root'
})
export class MapApiService {

    private apiUrl = 'https://private-88332-patrickbattisti.apiary-mock.com';
    private routes: Position[] = [];
    constructor(
        private http: HttpClient
    ) {

    }

    init() {
        this.routes = JSON.parse(window.localStorage.getItem(StorageKeys.TRAJETORIO)) || [];
    }

    public getRoutes(): Promise<Position[]> {
        return new Promise((resolve, reject) => {

            if(this.routes.length) {
                console.log('CARREGOU LOCAL');
                return resolve(this.routes);

            }

            this.http.get(`${ this.apiUrl }/trajetoria`).toPromise()
                .then((res: Position[]) => {
                        console.log('CARREGOU API');
                        this.routes = res;
                        window.localStorage.setItem(StorageKeys.TRAJETORIO, JSON.stringify(res));
                        resolve(res);

                    }, err => {
                        console.log(err);
                        reject(err);

                    }
                );
        });

    }

    public getHistory() {

    }



}
