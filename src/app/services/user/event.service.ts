import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class EventService {
    private controller = '/Event';
    constructor(private webApi: WebApiService) { }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    eventnotClosed() {
        return this.webApi.get(`${this.controller}/Open`);
    }
}
