import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Position } from '../interfaces/Position';
import { StorageKeys } from '../../storage-keys';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class MapApiService {

    private apiUrl = 'https://private-88332-patrickbattisti.apiary-mock.com';
    private positionsRoutes: Position[] = [];
    private positionsCalendar = [];
    constructor(
        private http: HttpClient
    ) {

    }

    init() {
        this.positionsRoutes = JSON.parse(window.localStorage.getItem(StorageKeys.ROUTE)) || [];
        this.positionsCalendar = JSON.parse(window.localStorage.getItem(StorageKeys.CALENDAR)) || [];
    }

    public getRoutes(): Promise<Position[]> {
        return new Promise((resolve, reject) => {

            if (this.positionsRoutes.length) {
                console.log('CARREGOU LOCAL');
                return resolve(this.positionsRoutes);

            }

            this.http.get(`${ this.apiUrl }/posicoes/trajetorio`).toPromise()
                .then((res: Position[]) => {
                        console.log('CARREGOU API');
                        this.positionsRoutes = res;
                        window.localStorage.setItem(StorageKeys.ROUTE, JSON.stringify(res));
                        resolve(res);

                    }, err => {
                        reject(err);

                    }
                );
        });

    }

    public getHistory(dateTime: Date): Promise<Position[]> {
        return new Promise((resolve, reject) => {

            const date = moment(dateTime).format('YYYY-MM-DD');

            const positionsToDate = this.positionsCalendar.find(item => item.date === date);

            if (positionsToDate) {
                console.log('CARREGOU LOCAL');
                return resolve(positionsToDate.positions);

            }

            this.http.get(`${ this.apiUrl }/posicoes/data/${ date }`).toPromise()
                .then((res: Position[]) => {
                        console.log('CARREGOU API');
                        this.positionsCalendar.push({date: date, positions: res});

                        window.localStorage.setItem(StorageKeys.CALENDAR, JSON.stringify(this.positionsCalendar));
                        resolve(res);

                    }, err => {
                        reject(err);

                    }
                );
        });
    }
}
