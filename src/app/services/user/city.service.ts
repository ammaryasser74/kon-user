
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CityService {
    private controller = '/City';
    constructor(private webApi: WebApiService) { }

GetList(ID) {
        return this.webApi.get(`${this.controller}/GetList/`+ID);
    }

}
