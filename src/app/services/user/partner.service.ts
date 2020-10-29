import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
@Injectable()
export class PartnerService {
    private controller = '/Partner';
    constructor(private webApi: WebApiService) { }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }


}
