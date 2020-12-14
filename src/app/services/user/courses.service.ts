import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private controller: string = '/Course';
  constructor(private webApi: WebApiService) { }

  GetList() {
    return this.webApi.get(`${this.controller}/GetList`);
  }

  getById(courseId: any){
    return this.webApi.get(`${this.controller}/GetByID/${courseId}`);
  }
}
