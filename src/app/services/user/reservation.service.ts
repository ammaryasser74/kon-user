import {Injectable} from '@angular/core';
import {WebApiService} from "../webApi.service";

@Injectable()
export class ReservationService {
    private controller: string = '/Reservation';

    constructor(private webApi: WebApiService) {
    }

    UploadActionComment(param) {
        return this.webApi.post(`${this.controller}/UploadActionComment`, param);
    }

    UploadActionPlan(param) {
        return this.webApi.post(`${this.controller}/UploadActionPlan`, param);
    }

    post(myParam) {
        return this.webApi.post(`${this.controller}/Post`, myParam);
    }

    Time(myParam) {
        return this.webApi.post(`${this.controller}/Time`, myParam);
    }

    GetListTime(date, coach_id) {
        return this.webApi.get(`/Time/GetList?date=${date}&coach_id=${coach_id}`);
    }

    UpdateTime(myParam) {
        return this.webApi.post(`${this.controller}/UpdateTime`, myParam);
    }

    UpdateStatus(id) {
        return this.webApi.get(`${this.controller}/UpdateStatus/${id}`);
    }

    GetByID(ID) {
        return this.webApi.get(`${this.controller}/GetByID/` + ID);
    }

}
