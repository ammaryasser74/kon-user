import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

export interface OrderFilter {
    ChiefID?: number;
    StartDate?: any;
    EndDate?: any;
  }
@Injectable()
export class KitchenService {
    private controller = '/Kitchen';
    constructor(private webApi: WebApiService) { }
    GetByID(UserID, chiefID) {
        return this.webApi.get(`${this.controller}/GetByID/` + chiefID + '?UserID=' + UserID);
    }
    GetBySlug(UserID, slug) {
        return this.webApi.get(`${this.controller}/GetBySlug/` + slug + '?UserID=' + UserID);
    }
    Rate(myParam) {
        return this.webApi.post(`${this.controller}/Rate`, myParam);
    }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    Days() {
        return this.webApi.get(`/Day/GetList`);
    }
    Updatechief(myParam) {
        return this.webApi.post(`${this.controller}/Update`, myParam);
    }
    Active(UserID) {
        return this.webApi.get(`${this.controller}/Active?UserID=` + UserID);
    }
    DishGetList(chiefID) {
        return this.webApi.get(`/Kitchen/Dish/GetList?ChiefID=` + chiefID);
    }
    DeleteDish(DishID) {
        return this.webApi.get(`/Kitchen/Dish/Delete/` + DishID);
    }
    addDish(myParam) {
        return this.webApi.post(`/Kitchen/Dish/Post`, myParam);
    }
    updateDish(myParam) {
        return this.webApi.post(`/Kitchen/Dish/Update`, myParam);
    }
    kitchenOrder(myParam) {
        return this.webApi.post(`/Kitchen/Order/GetList`, myParam);
    }
    UpdateStatus(myParam) {
        return this.webApi.post(`/Kitchen/Order/UpdateStatus`, myParam);
    }
    AllOrder(chiefID) {
        return this.webApi.get(`/Kitchen/Order/AllOrder/` + chiefID);
    }

}
