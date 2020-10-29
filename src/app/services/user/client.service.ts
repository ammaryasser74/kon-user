
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ClientService {
    private controller = '/Client';
    constructor(private webApi: WebApiService) { }

    GetByID(clientID) {
        return this.webApi.get(`${this.controller}/GetByID/${clientID}`);
    }
    Update(myParam) {
        return this.webApi.post(`${this.controller}/Update`, myParam);
    }
    Reservation(clientID) {
        return this.webApi.get(`${this.controller}/Reservation/${clientID}`);
    }
    
    SaveAvater(myParam) {
        return this.webApi.post(`/SaveAvater`, myParam);
    }
    ChangePassword(myParam) {
        return this.webApi.post(`/ChangePassword`, myParam);
    }
}
