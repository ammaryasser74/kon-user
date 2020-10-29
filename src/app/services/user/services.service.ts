import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ServiceService {
    private controller = '/Service';
    constructor(private webApi: WebApiService) { }

    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    
    Session(id) {
        return this.webApi.get(`${this.controller}/Session/${id}`);
    }

}
