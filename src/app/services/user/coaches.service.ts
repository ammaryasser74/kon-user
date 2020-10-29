import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CoachService {
    private controller = '/Coach';
    constructor(private webApi: WebApiService) { }

    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    GetByID(clientID) {
        return this.webApi.get(`${this.controller}/GetByID/${clientID}`);
    }
    Reservation(myparam){
        return this.webApi.post(`${this.controller}/Reservation`,myparam);
    }

}
