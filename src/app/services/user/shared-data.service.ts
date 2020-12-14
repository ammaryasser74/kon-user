import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private dataSource = new BehaviorSubject<any>(null);
  sharedData = this.dataSource.asObservable();

  constructor() { }

  updateSharedData(newData: {}){
    this.dataSource.next(newData);
  }
}
