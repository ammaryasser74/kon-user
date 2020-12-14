import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  private controller: string = '/Package';
  constructor(private webApi: WebApiService) { }

  GetList() {
    return this.webApi.get(`${this.controller}/GetList`);
  }

  getById(packageId: any){
    return this.webApi.get(`${this.controller}/GetByID/${packageId}`);
  }

  GetListTime(date, coach_id) {
    return this.webApi.get(`/Time/GetList?date=${date}&coach_id=${coach_id}`);
}
}
